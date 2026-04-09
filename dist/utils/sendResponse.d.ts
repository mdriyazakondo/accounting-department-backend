import { Response } from "express";
export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}
declare const sendResponse: <T>(res: Response, data: IResponse<T>) => Response<IResponse<T>>;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map