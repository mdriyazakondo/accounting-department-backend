import { Schema, model } from "mongoose";
const messageSchema = new Schema({
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
}, { timestamps: true });
// Index for efficient querying
messageSchema.index({ roomId: 1, timestamp: -1 });
const Message = model("Message", messageSchema);
export default Message;
//# sourceMappingURL=message.model.js.map