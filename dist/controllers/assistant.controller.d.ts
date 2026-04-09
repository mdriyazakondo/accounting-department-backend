import { Response } from "express";
import { JWTAuthRequest } from "../middlewares/jwtAuthMiddleware.js";
export declare const assistantQuery: (req: JWTAuthRequest, res: Response) => Promise<Response<import("../utils/sendResponse.js").IResponse<null>, Record<string, any>> | Response<import("../utils/sendResponse.js").IResponse<{
    role: string;
    queryType: string;
    answer: string;
    sensitivityLevel: string;
    processingTime: number;
    timestamp: string;
    dataAccessed: string[] | null;
}>, Record<string, any>>>;
//# sourceMappingURL=assistant.controller.d.ts.map