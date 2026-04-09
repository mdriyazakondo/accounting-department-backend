import sendResponse from "../utils/sendResponse.js";
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    console.error("Error:", {
        statusCode,
        message,
        stack: err.stack,
    });
    sendResponse(res, {
        statusCode,
        success: false,
        message,
        data: null,
    });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map