import { Router } from "express";
import { registerTeacher, loginTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher, } from "../controllers/teacher.controller.js";
const teacherRouter = Router();
// Auth routes
teacherRouter.post("/register", registerTeacher);
teacherRouter.post("/login", loginTeacher);
// CRUD routes
teacherRouter.get("/", getAllTeachers);
teacherRouter.get("/:id", getTeacherById);
teacherRouter.put("/:id", updateTeacher);
teacherRouter.delete("/:id", deleteTeacher);
export default teacherRouter;
//# sourceMappingURL=teacher.route.js.map