declare class ChatService {
    createRoom(name: string, type: "public" | "private" | "direct", createdBy: string, participants?: string[]): Promise<import("mongoose").Document<unknown, {}, import("../models/chatRoom.model.js").IChatRoom, {}, import("mongoose").DefaultSchemaOptions> & import("../models/chatRoom.model.js").IChatRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getUserRooms(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/chatRoom.model.js").IChatRoom, {}, import("mongoose").DefaultSchemaOptions> & import("../models/chatRoom.model.js").IChatRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    saveMessage(senderId: string, senderEmail: string, roomId: string, content: string, messageType?: "text" | "image" | "file"): Promise<import("mongoose").Document<unknown, {}, import("../models/message.model.js").IMessage, {}, import("mongoose").DefaultSchemaOptions> & import("../models/message.model.js").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getMessageHistory(roomId: string, limit?: number, offset?: number): Promise<(import("mongoose").Document<unknown, {}, import("../models/message.model.js").IMessage, {}, import("mongoose").DefaultSchemaOptions> & import("../models/message.model.js").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    markMessagesAsRead(roomId: string, userId: string): Promise<void>;
    setUserOnline(userId: string, email: string, socketId?: string): Promise<import("mongoose").Document<unknown, {}, import("../models/userStatus.model.js").IUserStatus, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userStatus.model.js").IUserStatus & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    setUserOffline(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/userStatus.model.js").IUserStatus, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userStatus.model.js").IUserStatus & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getOnlineUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../models/userStatus.model.js").IUserStatus, {}, import("mongoose").DefaultSchemaOptions> & import("../models/userStatus.model.js").IUserStatus & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    isUserInRoom(userId: string, roomId: string): Promise<boolean>;
    addUserToRoom(roomId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/chatRoom.model.js").IChatRoom, {}, import("mongoose").DefaultSchemaOptions> & import("../models/chatRoom.model.js").IChatRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    removeUserFromRoom(roomId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/chatRoom.model.js").IChatRoom, {}, import("mongoose").DefaultSchemaOptions> & import("../models/chatRoom.model.js").IChatRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getRoomParticipants(roomId: string): Promise<string[]>;
}
declare const _default: ChatService;
export default _default;
//# sourceMappingURL=chatService.d.ts.map