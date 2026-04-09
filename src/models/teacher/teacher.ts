import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { ITeacher } from "../../types/teacher.js";

export interface ITeacherDocument extends ITeacher, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const teacherSchema = new Schema<ITeacherDocument>(
  {
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
    photo: { type: String },
    department: { type: String, required: true, trim: true },
    date_of_birth: { type: Date, required: true },
    address: { type: String, required: true, trim: true },
    blood: { type: String, required: true, enum: bloodTypes },
    bio: { type: String, required: true, maxlength: 500, trim: true },
    description: { type: String, required: true, maxlength: 1000, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

teacherSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw error;
  }
});

teacherSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Teacher = model<ITeacherDocument>("Teacher", teacherSchema);

export default Teacher;
