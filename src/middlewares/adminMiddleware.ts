import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: Please login first",
        data: null,
      });
      return;
    }

    // Check if user has admin role
    if (req.user.role !== "admin") {
      sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden: Only admins can access this resource",
        data: null,
      });
      return;
    }

    // User is admin, proceed to next middleware
    next();
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal server error",
      data: error,
    });
  }
};

export default adminMiddleware;
