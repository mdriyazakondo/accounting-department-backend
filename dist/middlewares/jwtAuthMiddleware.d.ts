import { Request, Response, NextFunction } from "express";
export interface JWTAuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        userType?: string;
    };
}
declare const jwtAuthMiddleware: (req: JWTAuthRequest, res: Response, next: NextFunction) => void;
export declare const assistantAuthMiddleware: (req: JWTAuthRequest, res: Response, next: NextFunction) => void;
export default jwtAuthMiddleware;
//# sourceMappingURL=jwtAuthMiddleware.d.ts.map