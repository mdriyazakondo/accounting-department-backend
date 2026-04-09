import Message from "../models/message.model.js";
import ChatRoom from "../models/chatRoom.model.js";
import UserStatus from "../models/userStatus.model.js";
import User from "../models/user.model.js";

class ChatService {
  // Create a new chat room
  async createRoom(
    name: string,
    type: "public" | "private" | "direct",
    createdBy: string,
    participants: string[] = [],
  ) {
    const room = await ChatRoom.create({
      name,
      type,
      participants: [createdBy, ...participants],
      createdBy,
    });
    return room;
  }

  // Get user's chat rooms
  async getUserRooms(userId: string) {
    return await ChatRoom.find({
      participants: userId,
    }).sort({ updatedAt: -1 });
  }

  // Save a message
  async saveMessage(
    senderId: string,
    senderEmail: string,
    roomId: string,
    content: string,
    messageType: "text" | "image" | "file" = "text",
  ) {
    const message = await Message.create({
      sender: senderId,
      senderEmail,
      roomId,
      content,
      messageType,
    });

    // Update room's last message
    await ChatRoom.findByIdAndUpdate(roomId, {
      lastMessage: {
        content,
        sender: senderId,
        senderEmail,
        timestamp: new Date(),
      },
    });

    return message;
  }

  // Get message history for a room
  async getMessageHistory(
    roomId: string,
    limit: number = 50,
    offset: number = 0,
  ) {
    return await Message.find({ roomId })
      .sort({ timestamp: -1 })
      .skip(offset)
      .limit(limit)
      .sort({ timestamp: 1 }); // Return in chronological order
  }

  // Mark messages as read
  async markMessagesAsRead(roomId: string, userId: string) {
    await Message.updateMany(
      { roomId, readBy: { $ne: userId } },
      { $push: { readBy: userId } },
    );
  }

  // Update user online status
  async setUserOnline(userId: string, email: string, socketId?: string) {
    return await UserStatus.findOneAndUpdate(
      { userId },
      {
        email,
        isOnline: true,
        lastSeen: new Date(),
        socketId,
      },
      { upsert: true, new: true },
    );
  }

  // Update user offline status
  async setUserOffline(userId: string) {
    return await UserStatus.findOneAndUpdate(
      { userId },
      {
        isOnline: false,
        lastSeen: new Date(),
        $unset: { socketId: 1 },
      },
      { new: true },
    );
  }

  // Get online users
  async getOnlineUsers() {
    return await UserStatus.find({ isOnline: true });
  }

  // Check if user is participant in room
  async isUserInRoom(userId: string, roomId: string): Promise<boolean> {
    const room = await ChatRoom.findOne({
      _id: roomId,
      participants: userId,
    });
    return !!room;
  }

  // Add user to room
  async addUserToRoom(roomId: string, userId: string) {
    return await ChatRoom.findByIdAndUpdate(
      roomId,
      { $addToSet: { participants: userId } },
      { new: true },
    );
  }

  // Remove user from room
  async removeUserFromRoom(roomId: string, userId: string) {
    return await ChatRoom.findByIdAndUpdate(
      roomId,
      { $pull: { participants: userId } },
      { new: true },
    );
  }

  // Get room participants
  async getRoomParticipants(roomId: string) {
    const room = await ChatRoom.findById(roomId).select("participants");
    return room?.participants || [];
  }
}

export default new ChatService();
