import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const managementSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    photo: { type: String, trim: true },
    dateOfBirth: { type: Date },
    address: { type: String, trim: true },
}, {
    timestamps: true,
    versionKey: false,
});
managementSchema.pre("save", async function (next) {
    const nextFn = next;
    if (!this.isModified("password"))
        return nextFn();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    nextFn();
});
managementSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
const Management = model("Management", managementSchema);
export default Management;
//# sourceMappingURL=management.js.map