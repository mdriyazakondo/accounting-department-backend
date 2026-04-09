import { Request, Response } from "express";
export declare const createEvent: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/event/event.js").IEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/event/event.js").IEventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const getAllEvents: (_req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<(import("mongoose").Document<unknown, {}, import("../models/event/event.js").IEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/event/event.js").IEventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>, Record<string, any>>>;
export declare const getActiveEvents: (_req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<(import("mongoose").Document<unknown, {}, import("../models/event/event.js").IEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/event/event.js").IEventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>, Record<string, any>>>;
export declare const getEventById: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/event/event.js").IEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/event/event.js").IEventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const updateEvent: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/event/event.js").IEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/event/event.js").IEventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const deleteEvent: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>>>;
export declare const joinEvent: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/event/event.js").IEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/event/event.js").IEventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
export declare const leaveEvent: (req: Request, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<import("mongoose").Document<unknown, {}, import("../models/event/event.js").IEventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/event/event.js").IEventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>, Record<string, any>>>;
//# sourceMappingURL=event.controller.d.ts.map