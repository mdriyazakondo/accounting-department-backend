import "dotenv/config";
import { createServer } from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import SocketService from "./utils/socketService.js";

const DEFAULT_PORT = 5000;
let currentPort = parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10);

connectDB();

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
const socketService = new SocketService(server);

const startServer = (port: number) => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Socket.IO server initialized`);
  });
};

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    if (currentPort < DEFAULT_PORT + 5) {
      console.warn(
        `Port ${currentPort} is already in use, trying ${currentPort + 1}`,
      );
      currentPort += 1;
      startServer(currentPort);
      return;
    }

    console.error(
      `Port ${currentPort} is already in use. Please stop the process using this port or set PORT to a different value.`,
    );
    process.exit(1);
  }
  throw error;
});

startServer(currentPort);
