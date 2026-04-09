import { Schema, model, Document } from "mongoose";

export interface IChatRoom extends Document {
  name: string;
  type: "public" | "private" | "direct";
  participants: string[]; // Array of user IDs
  createdBy: string; // User ID who created the room
  lastMessage?: {
    content: string;
    sender: string;
    senderEmail: string;
    timestamp: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const chatRoomSchema = new Schema<IChatRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["public", "private", "direct"],
      default: "public",
    },
    participants: [
      {
        type: String,
        required: true,
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
    lastMessage: {
      content: String,
      sender: String,
      senderEmail: String,
      timestamp: Date,
    },
  },
  { timestamps: true },
);

// Index for efficient querying
chatRoomSchema.index({ participants: 1 });
chatRoomSchema.index({ type: 1 });

const ChatRoom = model<IChatRoom>("ChatRoom", chatRoomSchema);

export default ChatRoom;
