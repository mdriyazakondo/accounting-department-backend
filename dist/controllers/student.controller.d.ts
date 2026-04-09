import { Request, Response } from "express";
export declare const registerStudent: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/student/student.model.js").IStudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/student/student.model.js").IStudentDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const loginStudent: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/student/student.model.js").IStudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/student/student.model.js").IStudentDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const studentDataCreate: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/student/student.model.js").IStudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/student/student.model.js").IStudentDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const getAllStudents: (_req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<(import("mongoose").Document<unknown, {}, import("../models/student/student.model.js").IStudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/student/student.model.js").IStudentDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>, Record<string, any>>>;
export declare const getStudentById: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/student/student.model.js").IStudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/student/student.model.js").IStudentDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const updateStudent: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/student/student.model.js").IStudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/student/student.model.js").IStudentDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const deleteStudent: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>>>;
//# sourceMappingURL=student.controller.d.ts.map