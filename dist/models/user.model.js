import { Schema, model } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const User = model("User", userSchema);
export default User;
//# sourceMappingURL=user.model.js.map