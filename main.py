import os
import json
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import websockets

from paisalo_knowledge import PAISALO_KNOWLEDGE_BASE
from paisalo_prompt import SYSTEM_INSTRUCTION_PAISALO_ASSISTANT

app = FastAPI(
    title="Paisalo Digital AI Voice Assistant",
    description="FastAPI Backend for Paisalo AI Voice Assistant with Gemini Live API",
    version="1.0.0"
)

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "service": "Paisalo AI Voice Assistant (FastAPI / Python)",
        "framework": "FastAPI"
    }

@app.get("/api/knowledge")
async def get_knowledge():
    return {"knowledge": PAISALO_KNOWLEDGE_BASE}

GEMINI_LIVE_WS_URL = "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent"

@app.websocket("/live")
async def websocket_live_session(websocket: WebSocket):
    await websocket.accept()
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        await websocket.send_json({
            "type": "error",
            "error": "GEMINI_API_KEY is not configured on the server. Please add your key in Settings > Secrets."
        })
        await websocket.close()
        return

    gemini_url = f"{GEMINI_LIVE_WS_URL}?key={api_key}"

    try:
        async with websockets.connect(gemini_url) as gemini_ws:
            # Send session setup message to Gemini Live API
            setup_msg = {
                "setup": {
                    "model":"models/gemini-3.1-flash-live-preview",
                    "generationConfig": {
                        "responseModalities": ["AUDIO"],
                        "speechConfig": {
                            "voiceConfig": {
                                "prebuiltVoiceConfig": {
                                    "voiceName": "Kore"
                                }
                            }
                        }
                    },
                    "systemInstruction": {
                        "parts": [
                            {
                                "text": SYSTEM_INSTRUCTION_PAISALO_ASSISTANT
                            }
                        ]
                    }
                }
            }
            await gemini_ws.send(json.dumps(setup_msg))

            # Notify client that connection is established
            await websocket.send_json({
                "type": "status",
                "status": "connected"
            })

            # Task 1: Stream Gemini audio & text responses back to Client
            async def forward_from_gemini():
                try:
                    async for raw_msg in gemini_ws:
                        msg = json.loads(raw_msg)
                        server_content = msg.get("serverContent", {})
                        
                        # Handle audio output parts
                        model_turn = server_content.get("modelTurn", {})
                        parts = model_turn.get("parts", [])
                        for part in parts:
                            inline_data = part.get("inlineData", {})
                            if inline_data.get("data"):
                                await websocket.send_json({
                                    "type": "audio",
                                    "audio": inline_data["data"]
                                })
                            if part.get("text"):
                                await websocket.send_json({
                                    "type": "assistantText",
                                    "assistantText": part["text"]
                                })

                        # Handle barge-in interruption
                        if server_content.get("interrupted"):
                            await websocket.send_json({
                                "type": "interrupted",
                                "interrupted": True
                            })

                        # Handle turn complete
                        if server_content.get("turnComplete"):
                            await websocket.send_json({
                                "type": "turnComplete"
                            })

                except Exception as e:
                    print("Error forwarding from Gemini:", e)

            # Task 2: Stream Client PCM Audio & Text input to Gemini Live API
            async def forward_from_client():
                try:
                    while True:
                        raw_data = await websocket.receive_text()
                        payload = json.loads(raw_data)
                        
                        if payload.get("type") == "audio" and payload.get("audio"):
                            realtime_input = {
                                "realtimeInput": {
                                    "audio": {
                                        "mimeType": "audio/pcm;rate=16000",
                                        "data": payload["audio"]
                                    }
                                }
                            }
                            await gemini_ws.send(json.dumps(realtime_input))
                            
                        elif payload.get("type") == "text" and payload.get("text"):
                            client_content = {
                                "clientContent": {
                                    "turns": [
                                        {
                                            "role": "user",
                                            "parts": [{"text": payload["text"]}]
                                        }
                                    ],
                                    "turnComplete": True
                                }
                            }
                            await gemini_ws.send(json.dumps(client_content))

                except WebSocketDisconnect:
                    print("Client WebSocket disconnected")
                except Exception as e:
                    print("Error forwarding from client:", e)

            # Run both streaming channels asynchronously
            await asyncio.gather(
                forward_from_gemini(),
                forward_from_client(),
                return_exceptions=True
            )

    except Exception as err:
        print("FastAPI Live session error:", err)
        try:
            await websocket.send_json({
                "type": "error",
                "error": str(err)
            })
        except Exception:
            pass

# Serve static React UI build if present
if os.path.exists("dist"):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 3000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
