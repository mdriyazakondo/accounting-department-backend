import { Schema, model, Document } from "mongoose";
import { IStudent } from "../../types/Student.js";

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    photo: { type: String },
    department: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    class_role: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    year: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    father_name: { type: String },
    mother_name: { type: String },
    hobbies: { type: [String] },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

const Student = model<IStudent>("Student", studentSchema);

export default Student;
