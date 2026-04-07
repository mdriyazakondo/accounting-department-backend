import { Request, Response } from "express";
import Student from "../models/student/student.model";
import Teacher from "../models/teacher/techer";
import sendResponse from "../utils/sendResponse";

// UNIFIED LOGIN for Student and Teacher
export const unifiedLogin = async (req: Request, res: Response) => {
  try {
    const { email, password, userType } = req.body;

    // Validate inputs
    if (!email || !password) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Email and password are required",
        data: null,
      });
    }

    let user;
    let type: "student" | "teacher" | "";

    // If userType is specified, search only that type
    if (userType === "student") {
      user = await Student.findOne({ email });
      if (!user) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Invalid email or password",
          data: null,
        });
      }
      type = "student";
    } else if (userType === "teacher") {
      user = await Teacher.findOne({ email });
      if (!user) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Invalid email or password",
          data: null,
        });
      }
      type = "teacher";
    } else {
      // Try to find in both collections
      user = await Student.findOne({ email });
      if (user) {
        type = "student";
      } else {
        user = await Teacher.findOne({ email });
        type = user ? "teacher" : "";
      }

      if (!user) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Invalid email or password",
          data: null,
        });
      }
    }

    // Compare passwords
    const isPasswordValid = await user!.comparePassword(password);
    if (!isPasswordValid) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Invalid email or password",
        data: null,
      });
    }

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        user,
        userType: type,
      },
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error during login",
      data: error,
    });
  }
};
