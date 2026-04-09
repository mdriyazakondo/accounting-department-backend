import { JwtPayload } from "jsonwebtoken";
interface JWTPayload extends JwtPayload {
    userId: string;
    email: string;
    userType?: string;
}
declare class JWTService {
    private secret;
    private expiresIn;
    constructor();
    generateToken(payload: JWTPayload): string;
    verifyToken(token: string): JWTPayload | null;
}
declare const _default: JWTService;
export default _default;
//# sourceMappingURL=jwtService.d.ts.map