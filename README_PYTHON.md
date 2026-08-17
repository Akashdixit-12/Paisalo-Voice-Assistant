# 🐍 PAISALO Digital AI Voice Assistant — Python & FastAPI Backend

This repository includes a production-ready **Python + FastAPI** WebSocket backend for the **Paisalo AI Voice Assistant**, featuring:
- **FastAPI / Uvicorn ASGI Server** running on port `3000`.
- **Gemini Live API WebSocket Integration** (`/live` endpoint) supporting real-time bidirectional 16kHz PCM audio streaming & barge-in.
- **Devanagari "पैसालो" Grounded System Prompts** (`paisalo_prompt.py`).
- **Paisalo Knowledge Base** (`paisalo_knowledge.py`).
- **Static File Serving**: Automatically serves the compiled React frontend from `dist/`.

---

## 🚀 Quickstart (Running with Python & FastAPI)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Environment Variables
```bash
export GEMINI_API_KEY="your_actual_gemini_api_key_here"
export PORT=3000
```

### 3. Run FastAPI Server with Uvicorn
```bash
uvicorn main:app --host 0.0.0.0 --port 3000 --reload
```

Open your browser at `http://localhost:3000` to interact with the Voice Assistant!

---

## 🐳 Docker / Cloud Run Deployment

Build and run using the provided `Dockerfile`:

```bash
# Build Docker image
docker build -t paisalo-fastapi-voice .

# Run Container
docker run -p 3000:3000 -e GEMINI_API_KEY="your_api_key" paisalo-fastapi-voice
```

---

## 📡 Endpoints

| Endpoint | Type | Description |
|---|---|---|
| `GET /api/health` | REST | Health check endpoint |
| `GET /api/knowledge` | REST | Returns full Paisalo Knowledge Base JSON |
| `WS /live` | WebSocket | Bidirectional voice streaming endpoint connected to Gemini Live API |
| `GET /` | Static | Serves the React frontend app |
