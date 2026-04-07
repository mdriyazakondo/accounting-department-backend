import { Router } from "express";
import {
  deleteStudent,
  getAllStudents,
  getStudentById,
  studentDataCreate,
  updateStudent,
  registerStudent,
  loginStudent,
} from "../controllers/student.controller";

const studentRouter = Router();

studentRouter.post("/register", registerStudent);
studentRouter.post("/login", loginStudent);

studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", getStudentById);
studentRouter.post("/", studentDataCreate);
studentRouter.put("/:id", updateStudent);
studentRouter.delete("/:id", deleteStudent);
export default studentRouter;
