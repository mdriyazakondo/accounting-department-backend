import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getActiveEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
} from "../controllers/event.controller";

const eventRouter = Router();

// CRUD routes
eventRouter.post("/", createEvent);
eventRouter.get("/", getAllEvents);
eventRouter.get("/active", getActiveEvents);
eventRouter.get("/:id", getEventById);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);

// Event participation routes
eventRouter.post("/:id/join", joinEvent);
eventRouter.post("/:id/leave", leaveEvent);

export default eventRouter;
