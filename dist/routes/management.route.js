import { Router } from "express";
import { createManagement, getAllManagements, } from "../controllers/management.controller.js";
import managementMiddleware from "../middlewares/managementMiddleware.js";
const managementRouter = Router();
managementRouter.post("/", createManagement);
managementRouter.get("/", managementMiddleware, getAllManagements);
export default managementRouter;
//# sourceMappingURL=management.route.js.map