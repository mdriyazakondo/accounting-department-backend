import { Response } from "express";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

const sendResponse = <T>(
  res: Response,
  data: IResponse<T>,
): Response<IResponse<T>> => {
  return res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
