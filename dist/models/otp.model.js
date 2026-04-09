import { Schema, model } from "mongoose";
const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: { createdAt: true, updatedAt: false } });
// Index to automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const OTP = model("OTP", otpSchema);
export default OTP;
//# sourceMappingURL=otp.model.js.map