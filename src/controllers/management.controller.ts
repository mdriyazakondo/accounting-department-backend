import { Request, Response } from "express";
import Management from "../models/management/management.js";
import { IManagement } from "../types/management.js";
import sendResponse from "../utils/sendResponse.js";

// CREATE a new management user
export const createManagement = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      role,
      department,
      phone,
      photo,
      dateOfBirth,
      address,
    }: Partial<IManagement> = req.body;

    if (!name || !email || !password || !role || !department) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "All required fields must be provided",
        data: null,
      });
    }

    if (password.length < 6) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Password must be at least 6 characters long",
        data: null,
      });
    }

    const existingManagement = await Management.findOne({ email });
    if (existingManagement) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Email already registered",
        data: null,
      });
    }

    const newManagement = await Management.create({
      name,
      email,
      password,
      role,
      department,
      phone,
      photo,
      dateOfBirth,
      address,
    } as IManagement);

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Management user created successfully",
      data: newManagement,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error creating management user",
      data: error,
    });
  }
};

export const getAllManagements = async (_req: Request, res: Response) => {
  try {
    const managementUsers = await Management.find();
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Management users retrieved successfully",
      data: managementUsers,
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
