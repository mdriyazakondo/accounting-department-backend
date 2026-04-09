import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const teacherSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true, minlength: 6 }, // Auth field
    position: { type: String, required: true, trim: true },
    photo: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    date_of_birth: { type: Date, required: true },
    address: { type: String, required: true, trim: true },
    blood: { type: String, required: true, enum: bloodTypes },
    bio: { type: String, required: true, maxlength: 500, trim: true },
    description: { type: String, required: true, maxlength: 1000, trim: true },
}, {
    timestamps: true,
    versionKey: false,
});
teacherSchema.pre("save", async function (next) {
    const nextFn = next;
    if (!this.isModified("password"))
        return nextFn();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    nextFn();
});
teacherSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
export const Teacher = model("Teacher", teacherSchema);
export default Teacher;
//# sourceMappingURL=teacher.js.map