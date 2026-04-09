import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
  sender: string; // User ID
  senderEmail: string; // User email for display
  roomId: string; // Chat room ID
  content: string;
  messageType: "text" | "image" | "file";
  timestamp: Date;
  readBy: string[]; // Array of user IDs who have read the message
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    readBy: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

// Index for efficient querying
messageSchema.index({ roomId: 1, timestamp: -1 });

const Message = model<IMessage>("Message", messageSchema);

export default Message;
