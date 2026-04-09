import { Request, Response } from "express";
export declare const createManagement: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/management/management.js").IManagementDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/management/management.js").IManagementDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const getAllManagements: (_req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<(import("mongoose").Document<unknown, {}, import("../models/management/management.js").IManagementDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/management/management.js").IManagementDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>, Record<string, any>>>;
//# sourceMappingURL=management.controller.d.ts.map