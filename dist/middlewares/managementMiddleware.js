import sendResponse from "../utils/sendResponse.js";
const managementMiddleware = (req, res, next) => {
    try {
        if (!req.user) {
            sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized: Please login first",
                data: null,
            });
            return;
        }
        if ((req.user.userType && req.user.userType !== "management") ||
            (req.user.role && req.user.role !== "management")) {
            sendResponse(res, {
                statusCode: 403,
                success: false,
                message: "Forbidden: Only management users can access this resource",
                data: null,
            });
            return;
        }
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
export default managementMiddleware;
//# sourceMappingURL=managementMiddleware.js.map