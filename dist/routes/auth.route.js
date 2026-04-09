import { Router } from "express";
import { unifiedLogin, requestOTP, verifyOTP, } from "../controllers/auth.controller.js";
const authRouter = Router();
// Unified login endpoint for students and teachers
authRouter.post("/login", unifiedLogin);
// OTP-based authentication endpoints
authRouter.post("/request-otp", requestOTP);
authRouter.post("/verify-otp", verifyOTP);
export default authRouter;
//# sourceMappingURL=auth.route.js.map