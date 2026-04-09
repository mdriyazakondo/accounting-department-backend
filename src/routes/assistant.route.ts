import { Router } from "express";
import { assistantAuthMiddleware } from "../middlewares/jwtAuthMiddleware.js";
import { assistantQuery } from "../controllers/assistant.controller.js";

const assistantRouter = Router();

assistantRouter.post("/query", assistantAuthMiddleware, assistantQuery);

export default assistantRouter;
