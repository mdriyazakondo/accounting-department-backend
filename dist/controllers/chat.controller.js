import { Router } from "express";
import jwtAuthMiddleware from "../middlewares/jwtAuthMiddleware.js";
import chatService from "../utils/chatService.js";
import sendResponse from "../utils/sendResponse.js";
const chatRouter = Router();
// All chat routes require authentication
chatRouter.use(jwtAuthMiddleware);
// Get user's chat rooms
chatRouter.get("/rooms", async (req, res) => {
    try {
        if (!req.user?.userId) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized",
                data: null,
            });
        }
        const rooms = await chatService.getUserRooms(req.user.userId);
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Chat rooms retrieved successfully",
            data: rooms,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Error retrieving chat rooms",
            data: error,
        });
    }
});
// Create a new chat room
chatRouter.post("/rooms", async (req, res) => {
    try {
        if (!req.user?.userId) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized",
                data: null,
            });
        }
        const { name, type, participants = [] } = req.body;
        if (!name || !type) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Room name and type are required",
                data: null,
            });
        }
        if (!["public", "private", "direct"].includes(type)) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Invalid room type",
                data: null,
            });
        }
        const room = await chatService.createRoom(name, type, req.user.userId, participants);
        return sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Chat room created successfully",
            data: room,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Error creating chat room",
            data: error,
        });
    }
});
// Get message history for a room
chatRouter.get("/rooms/:roomId/messages", async (req, res) => {
    try {
        if (!req.user?.userId) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized",
                data: null,
            });
        }
        const roomId = req.params.roomId;
        if (!roomId || Array.isArray(roomId)) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Room ID is required",
                data: null,
            });
        }
        const { limit = 50, offset = 0 } = req.query;
        // Check if user is participant in room
        const isParticipant = await chatService.isUserInRoom(req.user.userId, roomId);
        if (!isParticipant) {
            return sendResponse(res, {
                statusCode: 403,
                success: false,
                message: "You are not authorized to view this room's messages",
                data: null,
            });
        }
        const messages = await chatService.getMessageHistory(roomId, parseInt(limit), parseInt(offset));
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Message history retrieved successfully",
            data: messages,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Error retrieving message history",
            data: error,
        });
    }
});
// Add user to room
chatRouter.post("/rooms/:roomId/join", async (req, res) => {
    try {
        if (!req.user?.userId) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized",
                data: null,
            });
        }
        const roomId = req.params.roomId;
        if (!roomId || Array.isArray(roomId)) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Room ID is required",
                data: null,
            });
        }
        const room = await chatService.addUserToRoom(roomId, req.user.userId);
        if (!room) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Room not found",
                data: null,
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfully joined the room",
            data: room,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Error joining room",
            data: error,
        });
    }
});
// Get online users
chatRouter.get("/online-users", async (req, res) => {
    try {
        const onlineUsers = await chatService.getOnlineUsers();
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Online users retrieved successfully",
            data: onlineUsers,
        });
    }
    catch (error) {
        console.error(error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Error retrieving online users",
            data: error,
        });
    }
});
export default chatRouter;
//# sourceMappingURL=chat.controller.js.map