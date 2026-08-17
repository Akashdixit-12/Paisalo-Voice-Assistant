import express from "express";
import http from "http";
import path from "path";
import { WebSocketServer } from "ws";
import { createServer as createViteServer } from "vite";
import { PAISALO_KNOWLEDGE_BASE } from "./src/data/paisaloKnowledge";
import { handleLiveSession } from "./src/server/geminiLive";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Paisalo AI Voice Assistant" });
  });

  app.get("/api/knowledge", (_req, res) => {
    res.json({ knowledge: PAISALO_KNOWLEDGE_BASE });
  });

  // Create HTTP server
  const server = http.createServer(app);

  // Setup WebSocket Server for Live API Voice Call
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    try {
      const host = request.headers.host || "localhost:3000";
      const url = new URL(request.url || "", `http://${host}`);
      if (url.pathname === "/live") {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    } catch (err) {
      console.error("Upgrade handler error:", err);
      socket.destroy();
    }
  });

  wss.on("connection", (ws) => {
    console.log("New incoming voice call WebSocket connection");
    handleLiveSession(ws);
  });

  // Vite Middleware in Development vs Static Serving in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Paisalo AI Voice Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
