import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}
declare const adminMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export default adminMiddleware;
//# sourceMappingURL=adminMiddleware.d.ts.map