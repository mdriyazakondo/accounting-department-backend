import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IStudent } from "../../types/Student.js";

export interface IStudentDocument extends IStudent, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const studentSchema = new Schema<IStudentDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    photo: { type: String },
    department: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    class_role: { type: String },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "male", "female"],
      required: true,
    },
    year: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    father_name: { type: String },
    mother_name: { type: String },
    hobbies: { type: [String] },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    versionKey: false,
  },
);

studentSchema.pre("save", async function () {
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

studentSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const Student = model<IStudentDocument>("Student", studentSchema);

export default Student;
