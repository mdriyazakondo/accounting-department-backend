import { Schema, model } from "mongoose";
const chatRoomSchema = new Schema({
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
}, { timestamps: true });
// Index for efficient querying
chatRoomSchema.index({ participants: 1 });
chatRoomSchema.index({ type: 1 });
const ChatRoom = model("ChatRoom", chatRoomSchema);
export default ChatRoom;
//# sourceMappingURL=chatRoom.model.js.map