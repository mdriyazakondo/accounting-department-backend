import { Schema, model, Document } from "mongoose";
import { IEvent } from "../../types/event.js";

export interface IEventDocument extends IEvent, Document {}

const eventSchema = new Schema<IEventDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    organizer: { type: String, required: true, trim: true },
    photo: { type: String },
    category: { type: String, required: true, trim: true },
    attendees: { type: [String], default: [] },
    maxAttendees: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Event = model<IEventDocument>("Event", eventSchema);

export default Event;
