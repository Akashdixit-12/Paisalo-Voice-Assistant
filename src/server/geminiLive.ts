import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { WebSocket } from "ws";
import { SYSTEM_INSTRUCTION_PAISALO_ASSISTANT } from "./paisaloAssistantPrompt";

export async function handleLiveSession(clientWs: WebSocket) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY environment variable is missing");
    clientWs.send(JSON.stringify({
      type: "error",
      error: "GEMINI_API_KEY is not configured on the server. Please add your key in Settings > Secrets."
    }));
    return;
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  try {
    let activeSession: any = null;

    const sessionPromise = ai.live.connect({
      model: "gemini-3.1-flash-live-preview",
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // 'Kore' is a warm, polite female voice ideal for customer support
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
        systemInstruction: SYSTEM_INSTRUCTION_PAISALO_ASSISTANT,
        outputAudioTranscription: {},
        inputAudioTranscription: {},
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          try {
            // Handle audio output chunk
            const parts = message.serverContent?.modelTurn?.parts;
            if (parts && parts.length > 0) {
              for (const part of parts) {
                if (part.inlineData?.data) {
                  clientWs.send(
                    JSON.stringify({
                      type: "audio",
                      audio: part.inlineData.data,
                    })
                  );
                }
                if (part.text) {
                  clientWs.send(
                    JSON.stringify({
                      type: "assistantText",
                      assistantText: part.text,
                    })
                  );
                }
              }
            }

            // Handle barge-in / user interruption
            if (message.serverContent?.interrupted) {
              clientWs.send(
                JSON.stringify({
                  type: "interrupted",
                  interrupted: true,
                })
              );
            }

            // Handle user speech transcription if returned by server
            const userText = (message.serverContent as any)?.inputAudioTranscription?.text;
            if (userText) {
              clientWs.send(
                JSON.stringify({
                  type: "userText",
                  userText,
                })
              );
            }

            // Handle model turn complete
            if (message.serverContent?.turnComplete) {
              clientWs.send(
                JSON.stringify({
                  type: "turnComplete",
                })
              );
            }
          } catch (err) {
            console.error("Error processing Live message:", err);
          }
        },
        onerror: (err) => {
          console.error("Gemini Live session error:", err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                type: "error",
                error: err.message || "Live API session encountered an error.",
              })
            );
          }
        },
        onclose: () => {
          console.log("Gemini Live session closed");
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                type: "status",
                status: "disconnected",
              })
            );
          }
        },
      },
    });

    activeSession = await sessionPromise;

    clientWs.send(
      JSON.stringify({
        type: "status",
        status: "connected",
      })
    );

    // Forward incoming client messages (PCM audio / text commands) to Gemini Live session
    clientWs.on("message", async (data: Buffer | string) => {
      try {
        const payload = JSON.parse(data.toString());

        if (payload.type === "audio" && payload.audio && activeSession) {
          activeSession.sendRealtimeInput({
            audio: {
              data: payload.audio,
              mimeType: "audio/pcm;rate=16000",
            },
          });
        } else if (payload.type === "text" && payload.text && activeSession) {
          activeSession.sendRealtimeInput({
            text: payload.text,
          });
        }
      } catch (e) {
        console.error("Error handling client message:", e);
      }
    });

    clientWs.on("close", () => {
      console.log("Client WebSocket closed, closing Gemini Live session");
      if (activeSession) {
        try {
          activeSession.close();
        } catch (e) {
          // Ignore close errors
        }
      }
    });
  } catch (error: any) {
    console.error("Failed to establish Gemini Live session:", error);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(
        JSON.stringify({
          type: "error",
          error: error.message || "Failed to connect to Paisalo Voice Service.",
        })
      );
    }
  }
}
