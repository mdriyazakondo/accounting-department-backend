import { Schema, model, Document } from "mongoose";

export interface IUserStatus extends Document {
  userId: string;
  email: string;
  isOnline: boolean;
  lastSeen: Date;
  socketId?: string; // Current socket connection ID
}

const userStatusSchema = new Schema<IUserStatus>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true },
);

const UserStatus = model<IUserStatus>("UserStatus", userStatusSchema);

export default UserStatus;
