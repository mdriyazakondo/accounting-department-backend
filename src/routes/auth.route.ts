import { Router } from "express";
import { unifiedLogin } from "../controllers/auth.controller";

const authRouter = Router();

// Unified login endpoint for students and teachers
authRouter.post("/login", unifiedLogin);

export default authRouter;
