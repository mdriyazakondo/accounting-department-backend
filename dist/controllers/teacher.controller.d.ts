import { Request, Response } from "express";
export declare const registerTeacher: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/teacher/teacher.js").ITeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/teacher/teacher.js").ITeacherDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const loginTeacher: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/teacher/teacher.js").ITeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/teacher/teacher.js").ITeacherDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const getAllTeachers: (_req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<(import("mongoose").Document<unknown, {}, import("../models/teacher/teacher.js").ITeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/teacher/teacher.js").ITeacherDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>, Record<string, any>>>;
export declare const getTeacherById: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/teacher/teacher.js").ITeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/teacher/teacher.js").ITeacherDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const updateTeacher: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/teacher/teacher.js").ITeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/teacher/teacher.js").ITeacherDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const deleteTeacher: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>>>;
//# sourceMappingURL=teacher.controller.d.ts.map