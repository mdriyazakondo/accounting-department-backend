import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    userType?: string;
  };
}

const teacherMiddleware = (
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

    // Check if user is a teacher
    if (req.user.userType && req.user.userType !== "teacher") {
      sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden: Only teachers can access this resource",
        data: null,
      });
      return;
    }

    // User is teacher, proceed to next middleware
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

export default teacherMiddleware;
