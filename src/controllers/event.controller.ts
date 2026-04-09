import { Request, Response } from "express";
import Event from "../models/event/event.js";
import { IEvent } from "../types/event.js";
import sendResponse from "../utils/sendResponse.js";

// CREATE a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      organizer,
      photo,
      category,
      maxAttendees,
      isActive,
    }: Partial<IEvent> = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !organizer ||
      !category
    ) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "All required fields must be provided",
        data: null,
      });
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      location,
      organizer,
      photo,
      category,
      maxAttendees,
      isActive: isActive ?? true,
    } as IEvent);

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error creating event",
      data: error,
    });
  }
};

// GET all events
export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Server error",
      data: error,
    });
  }
};

// GET active events only
export const getActiveEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ date: 1 });
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Active events retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Server error",
      data: error,
    });
  }
};

// GET single event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Event not found",
        data: null,
      });
    }
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Event retrieved successfully",
      data: event,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Server error",
      data: error,
    });
  }
};

// UPDATE event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Event not found",
        data: null,
      });
    }
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Server error",
      data: error,
    });
  }
};

// DELETE event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Event not found",
        data: null,
      });
    }
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Event deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Server error",
      data: error,
    });
  }
};

// JOIN event (add attendee)
export const joinEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { attendeeId } = req.body;

    if (!attendeeId) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Attendee ID is required",
        data: null,
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Event not found",
        data: null,
      });
    }

    // Check if already joined
    if (event.attendees && event.attendees.includes(attendeeId)) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Already joined this event",
        data: null,
      });
    }

    // Check max attendees limit
    if (
      event.maxAttendees &&
      event.attendees &&
      event.attendees.length >= event.maxAttendees
    ) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Event is full",
        data: null,
      });
    }

    // Add attendee
    event.attendees = event.attendees || [];
    event.attendees.push(attendeeId);
    await event.save();

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully joined event",
      data: event,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error joining event",
      data: error,
    });
  }
};

// LEAVE event (remove attendee)
export const leaveEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { attendeeId } = req.body;

    if (!attendeeId) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Attendee ID is required",
        data: null,
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Event not found",
        data: null,
      });
    }

    // Remove attendee
    if (event.attendees) {
      event.attendees = event.attendees.filter((id) => id !== attendeeId);
      await event.save();
    }

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully left event",
      data: event,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error leaving event",
      data: error,
    });
  }
};
