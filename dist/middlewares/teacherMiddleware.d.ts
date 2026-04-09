import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        userType?: string;
    };
}
declare const teacherMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export default teacherMiddleware;
//# sourceMappingURL=teacherMiddleware.d.ts.map