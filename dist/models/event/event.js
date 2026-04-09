import { Schema, model } from "mongoose";
const eventSchema = new Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
const Event = model("Event", eventSchema);
export default Event;
//# sourceMappingURL=event.js.map