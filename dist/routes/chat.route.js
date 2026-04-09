import { Router } from "express";
import chatRouter from "../controllers/chat.controller.js";
const router = Router();
// Mount chat routes
router.use("/chat", chatRouter);
export default router;
//# sourceMappingURL=chat.route.js.map