import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        userType?: string;
        role?: string;
    };
}
declare const managementMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export default managementMiddleware;
//# sourceMappingURL=managementMiddleware.d.ts.map