import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IManagement } from "../../types/management.js";

export interface IManagementDocument extends IManagement, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const managementSchema = new Schema<IManagementDocument>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

managementSchema.pre("save", async function () {
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

managementSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const Management = model<IManagementDocument>("Management", managementSchema);

export default Management;
