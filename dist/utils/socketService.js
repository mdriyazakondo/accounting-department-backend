import { Server as SocketIOServer } from "socket.io";
import jwtService from "./jwtService.js";
import chatService from "./chatService.js";
import User from "../models/user.model.js";
class SocketService {
    io;
    constructor(server) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: "*", // Configure this for production
                methods: ["GET", "POST"],
            },
        });
        this.initializeSocketEvents();
    }
    async authenticateSocket(socket, token) {
        try {
            const decoded = jwtService.verifyToken(token);
            if (!decoded)
                return false;
            // Verify user exists
            const user = await User.findById(decoded.userId);
            if (!user)
                return false;
            socket.userId = decoded.userId;
            socket.userEmail = decoded.email;
            return true;
        }
        catch (error) {
            console.error("Socket authentication error:", error);
            return false;
        }
    }
    initializeSocketEvents() {
        this.io.use(async (socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error("Authentication token required"));
            }
            const isAuthenticated = await this.authenticateSocket(socket, token);
            if (!isAuthenticated) {
                return next(new Error("Invalid authentication token"));
            }
            next();
        });
        this.io.on("connection", (socket) => {
            console.log(`User ${socket.userEmail} connected with socket ${socket.id}`);
            // Set user online
            if (socket.userId && socket.userEmail) {
                chatService.setUserOnline(socket.userId, socket.userEmail, socket.id);
                this.broadcastOnlineUsers();
            }
            // Join room
            socket.on("join-room", async (roomId) => {
                try {
                    if (!socket.userId)
                        return;
                    const isParticipant = await chatService.isUserInRoom(socket.userId, roomId);
                    if (!isParticipant) {
                        socket.emit("error", {
                            message: "You are not a participant in this room",
                        });
                        return;
                    }
                    socket.join(roomId);
                    console.log(`User ${socket.userEmail} joined room ${roomId}`);
                    // Mark messages as read
                    await chatService.markMessagesAsRead(roomId, socket.userId);
                    // Send message history
                    const messages = await chatService.getMessageHistory(roomId);
                    socket.emit("message-history", messages);
                }
                catch (error) {
                    console.error("Error joining room:", error);
                    socket.emit("error", { message: "Failed to join room" });
                }
            });
            // Leave room
            socket.on("leave-room", (roomId) => {
                socket.leave(roomId);
                console.log(`User ${socket.userEmail} left room ${roomId}`);
            });
            // Send message
            socket.on("send-message", async (data) => {
                try {
                    if (!socket.userId || !socket.userEmail)
                        return;
                    const { roomId, content, messageType = "text" } = data;
                    // Verify user is in room
                    const isParticipant = await chatService.isUserInRoom(socket.userId, roomId);
                    if (!isParticipant) {
                        socket.emit("error", {
                            message: "You are not authorized to send messages in this room",
                        });
                        return;
                    }
                    // Save message
                    const message = await chatService.saveMessage(socket.userId, socket.userEmail, roomId, content, messageType);
                    // Broadcast to room
                    this.io.to(roomId).emit("new-message", message);
                }
                catch (error) {
                    console.error("Error sending message:", error);
                    socket.emit("error", { message: "Failed to send message" });
                }
            });
            // Typing indicator
            socket.on("typing-start", (roomId) => {
                if (socket.userEmail) {
                    socket.to(roomId).emit("user-typing", {
                        userEmail: socket.userEmail,
                        isTyping: true,
                    });
                }
            });
            socket.on("typing-stop", (roomId) => {
                if (socket.userEmail) {
                    socket.to(roomId).emit("user-typing", {
                        userEmail: socket.userEmail,
                        isTyping: false,
                    });
                }
            });
            // Get online users
            socket.on("get-online-users", async () => {
                const onlineUsers = await chatService.getOnlineUsers();
                socket.emit("online-users", onlineUsers);
            });
            // Disconnect
            socket.on("disconnect", async () => {
                console.log(`User ${socket.userEmail} disconnected`);
                if (socket.userId) {
                    await chatService.setUserOffline(socket.userId);
                    this.broadcastOnlineUsers();
                }
            });
        });
    }
    async broadcastOnlineUsers() {
        const onlineUsers = await chatService.getOnlineUsers();
        this.io.emit("online-users-update", onlineUsers);
    }
    // Method to emit events from outside
    emitToRoom(roomId, event, data) {
        this.io.to(roomId).emit(event, data);
    }
    emitToUser(userId, event, data) {
        // Find user's socket and emit
        this.io.sockets.sockets.forEach((socket) => {
            if (socket.userId === userId) {
                socket.emit(event, data);
            }
        });
    }
    getIO() {
        return this.io;
    }
}
export default SocketService;
//# sourceMappingURL=socketService.js.map