import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

interface JWTPayload extends JwtPayload {
  userId: string;
  email: string;
  userType?: string;
}

class JWTService {
  private secret: string;
  private expiresIn: StringValue | number;

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is required");
    }

    this.secret = secret;
    this.expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as StringValue;
  }

  generateToken(payload: JWTPayload): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn,
    };
    return jwt.sign(payload, this.secret, options);
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch (error) {
      return null;
    }
  }
}

export default new JWTService();
