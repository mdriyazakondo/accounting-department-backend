import jwtService from "../utils/jwtService.js";
import sendResponse from "../utils/sendResponse.js";
const jwtAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized: No token provided",
                data: null,
            });
            return;
        }
        const token = authHeader.substring(7); // Remove "Bearer " prefix
        const decoded = jwtService.verifyToken(token);
        if (!decoded) {
            sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized: Invalid token",
                data: null,
            });
            return;
        }
        // Attach user info to request
        req.user = decoded;
        next();
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error,
        });
    }
};
// Special middleware for AI assistant with polite messages
export const assistantAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Welcome! To access our AI assistant, please log in first using your OTP verification. This ensures personalized and secure assistance tailored to your role.",
                data: null,
            });
            return;
        }
        const token = authHeader.substring(7); // Remove "Bearer " prefix
        const decoded = jwtService.verifyToken(token);
        if (!decoded) {
            sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Your session has expired. Please log in again to continue using the AI assistant. We appreciate your understanding.",
                data: null,
            });
            return;
        }
        // Attach user info to request
        req.user = decoded;
        next();
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "We encountered an issue with authentication. Please try logging in again.",
            data: null,
        });
    }
};
export default jwtAuthMiddleware;
//# sourceMappingURL=jwtAuthMiddleware.js.map