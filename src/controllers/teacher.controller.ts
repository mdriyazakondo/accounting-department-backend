import { Request, Response } from "express";
import Teacher from "../models/teacher/techer";
import { ITeacher } from "../types/teacher";
import sendResponse from "../utils/sendResponse";

// REGISTER a new teacher
export const registerTeacher = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      position,
      photo,
      department,
      date_of_birth,
      address,
      blood,
      bio,
      description,
    }: Partial<ITeacher> = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !position ||
      !photo ||
      !department ||
      !date_of_birth ||
      !address ||
      !blood ||
      !bio ||
      !description
    ) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "All required fields must be provided",
        data: null,
      });
    }

    // Validate password length
    if (password.length < 6) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Password must be at least 6 characters long",
        data: null,
      });
    }

    // Check if email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Email already registered",
        data: null,
      });
    }

    // Create new teacher
    const newTeacher = await Teacher.create({
      name,
      email,
      password,
      position,
      photo,
      department,
      date_of_birth,
      address,
      blood,
      bio,
      description,
    });

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Teacher registered successfully",
      data: newTeacher,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error registering teacher",
      data: error,
    });
  }
};

// LOGIN teacher
export const loginTeacher = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Email and password are required",
        data: null,
      });
    }

    // Find teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Invalid email or password",
        data: null,
      });
    }

    // Compare passwords
    const isPasswordValid = await teacher.comparePassword(password);
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
      data: teacher,
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

// GET all teachers
export const getAllTeachers = async (_req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find();
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teachers retrieved successfully",
      data: teachers,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Server error",
      data: error,
    });
  }
};

// GET single teacher by ID
export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Teacher not found",
        data: null,
      });
    }
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teacher retrieved successfully",
      data: teacher,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Server error",
      data: error,
    });
  }
};

// UPDATE teacher
export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTeacher) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Teacher not found",
        data: null,
      });
    }
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Server error",
      data: error,
    });
  }
};

// DELETE teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Teacher not found",
        data: null,
      });
    }
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teacher deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Server error",
      data: error,
    });
  }
};
