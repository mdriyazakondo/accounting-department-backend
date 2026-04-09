import jwt from "jsonwebtoken";
class JWTService {
    secret;
    expiresIn;
    constructor() {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET environment variable is required");
        }
        this.secret = secret;
        this.expiresIn = (process.env.JWT_EXPIRES_IN || "7d");
    }
    generateToken(payload) {
        const options = {
            expiresIn: this.expiresIn,
        };
        return jwt.sign(payload, this.secret, options);
    }
    verifyToken(token) {
        try {
            return jwt.verify(token, this.secret);
        }
        catch (error) {
            return null;
        }
    }
}
export default new JWTService();
//# sourceMappingURL=jwtService.js.map