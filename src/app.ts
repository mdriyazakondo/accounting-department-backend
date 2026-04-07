// src/app.ts
import express from "express";
import studentRouter from "./routes/student.route";
import teacherRouter from "./routes/teacher.route";
import authRouter from "./routes/auth.route";
import eventRouter from "./routes/event.route";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

// Auth routes
app.use("/api/auth", authRouter);

// Student routes
app.use("/api/student", studentRouter);

// Teacher routes
app.use("/api/teacher", teacherRouter);

// Event routes
app.use("/api/event", eventRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
