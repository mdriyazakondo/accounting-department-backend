import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  console.error("Error:", {
    statusCode,
    message,
    stack: err.stack,
  });

  sendResponse(res, {
    statusCode,
    success: false,
    message,
    data: null,
  });
};

export default errorHandler;
