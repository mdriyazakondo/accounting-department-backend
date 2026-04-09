import { Schema, model } from "mongoose";
const userStatusSchema = new Schema({
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
}, { timestamps: true });
const UserStatus = model("UserStatus", userStatusSchema);
export default UserStatus;
//# sourceMappingURL=userStatus.model.js.map