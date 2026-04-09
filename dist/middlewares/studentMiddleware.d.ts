import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        userType?: string;
    };
}
declare const studentMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export default studentMiddleware;
//# sourceMappingURL=studentMiddleware.d.ts.map