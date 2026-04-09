import { Request, Response } from "express";
import Student from "../models/student/student.model.js";
import Teacher from "../models/teacher/teacher.js";
import User from "../models/user.model.js";
import OTP from "../models/otp.model.js";
import sendResponse from "../utils/sendResponse.js";
import emailService from "../utils/emailService.js";
import jwtService from "../utils/jwtService.js";

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

// Generate a 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request OTP for authentication
export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Email is required",
        data: null,
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Invalid email format",
        data: null,
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP to database (this will replace any existing OTP for this email)
    await OTP.findOneAndDelete({ email }); // Delete existing OTP
    await OTP.create({ email, otp, expiresAt });

    // Send OTP via email
    try {
      await emailService.sendOTP(email, otp);
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Failed to send OTP email",
        data: null,
      });
    }

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "OTP sent successfully to your email",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error requesting OTP",
      data: error,
    });
  }
};

// Verify OTP and authenticate user
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Validate inputs
    if (!email || !otp) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Email and OTP are required",
        data: null,
      });
    }

    // Find OTP in database
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Invalid OTP",
        data: null,
      });
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
      await OTP.findByIdAndDelete(otpRecord._id); // Clean up expired OTP
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "OTP has expired",
        data: null,
      });
    }

    // OTP is valid, check if user exists
    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      // Create new user
      user = await User.create({ email, isVerified: true });
      isNewUser = true;
    } else {
      // Mark existing user as verified
      user.isVerified = true;
      await user.save();
    }

    // Determine role from existing student or teacher records
    const student = await Student.findOne({ email });
    const teacher = await Teacher.findOne({ email });
    const userType = student ? "student" : teacher ? "teacher" : "user";

    // Delete the used OTP
    await OTP.findByIdAndDelete(otpRecord._id);

    // Generate JWT token
    const token = jwtService.generateToken({
      userId: user._id.toString(),
      email: user.email,
      userType,
    });

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: isNewUser ? "Registration successful" : "Login successful",
      data: {
        user: {
          id: user._id,
          email: user.email,
          isVerified: user.isVerified,
        },
        token,
        isNewUser,
      },
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error verifying OTP",
      data: error,
    });
  }
};
