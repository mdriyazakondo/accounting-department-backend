// src/app.ts
import express from "express";
import studentRouter from "./routes/student.route.js";
import teacherRouter from "./routes/teacher.route.js";
import authRouter from "./routes/auth.route.js";
import eventRouter from "./routes/event.route.js";
import managementRouter from "./routes/management.route.js";
import chatRouter from "./routes/chat.route.js";
import assistantRouter from "./routes/assistant.route.js";
import errorHandler from "./middlewares/errorHandler.js";
const app = express();
app.use(express.json());
// Auth routes
app.use("/api/auth", authRouter);
// Student routes
app.use("/api/student", studentRouter);
// Teacher routes
app.use("/api/teacher", teacherRouter);
// Management routes
app.use("/api/management", managementRouter);
// Event routes
app.use("/api/event", eventRouter);
// Chat routes
app.use("/api", chatRouter);
// Assistant routes
app.use("/api/assistant", assistantRouter);
// Error handling middleware (must be last)
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map