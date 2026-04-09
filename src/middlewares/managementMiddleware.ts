import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    userType?: string;
    role?: string;
  };
}

const managementMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    if (!req.user) {
      sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: Please login first",
        data: null,
      });
      return;
    }

    if (
      (req.user.userType && req.user.userType !== "management") ||
      (req.user.role && req.user.role !== "management")
    ) {
      sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden: Only management users can access this resource",
        data: null,
      });
      return;
    }

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

export default managementMiddleware;
