// src/routes/index.ts
import { Router } from "express";
import {
  deleteStudent,
  getAllStudents,
  getStudentById,
  studentDataCreate,
  updateStudent,
} from "../controllers/student.controller.js";

const studentRouter = Router();

studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", getStudentById);
studentRouter.post("/", studentDataCreate);
studentRouter.put("/:id", updateStudent);
studentRouter.delete("/:id", deleteStudent);
export default studentRouter;
