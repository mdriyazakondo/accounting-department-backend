import { Request, Response } from "express";
import Student from "../models/student/student.model.js";
import Teacher from "../models/teacher/teacher.js";
import Management from "../models/management/management.js";
import sendResponse from "../utils/sendResponse.js";
import User from "../models/user.model.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { role, email, password } = req.body;

    if (!email || !password || !role) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Required fields missing",
        data: null,
      });
    }

    const isStudent = await Student.findOne({ email });
    const isTeacher = await Teacher.findOne({ email });
    const isManagement = await Management.findOne({ email });

    if (isStudent || isTeacher || isManagement) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "A user with this email already exists",
        data: null,
      });
    }

    let newUser;

    if (role === "student") {
      newUser = await Student.create(req.body);
    } else if (role === "teacher") {
      // Teacher Schema expects date_of_birth
      const teacherData = {
        ...req.body,
        date_of_birth: req.body.date_of_birth || req.body.dateOfBirth,
      };
      newUser = await Teacher.create(teacherData);
    } else if (role === "management") {
      // Management Schema expects role to be the staff position
      const managementData = {
        ...req.body,
        role: req.body.managementRole || role,
      };
      newUser = await Management.create(managementData);
    } else {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Invalid role selected",
        data: null,
      });
    }

    // ঐচ্ছিক: সাধারণ ইউজার কালেকশনে এন্ট্রি
    const existingGeneralUser = await User.findOne({ email });
    if (!existingGeneralUser) {
      await User.create({ email, isVerified: true });
    }

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      data: newUser,
    });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Error during registration",
      data: error,
    });
  }
};
