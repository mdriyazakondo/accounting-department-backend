import { Request, Response } from "express";
export declare const unifiedLogin: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<{
    user: (import("mongoose").Document<unknown, {}, import("../models/student/student.model.js").IStudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/student/student.model.js").IStudentDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | (import("mongoose").Document<unknown, {}, import("../models/teacher/teacher.js").ITeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/teacher/teacher.js").ITeacherDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    });
    userType: "" | "student" | "teacher";
}>, Record<string, any>>>;
export declare const requestOTP: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>>>;
export declare const verifyOTP: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<{
    user: {
        id: import("mongoose").Types.ObjectId;
        email: string;
        isVerified: boolean;
    };
    token: string;
    isNewUser: boolean;
}>, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map