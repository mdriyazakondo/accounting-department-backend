import sendResponse from "../utils/sendResponse.js";
const authMiddleware = (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized: Please login first",
                data: null,
            });
            return;
        }
        // User is authenticated, proceed to next middleware
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
export default authMiddleware;
//# sourceMappingURL=authMiddleware.js.map