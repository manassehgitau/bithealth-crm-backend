import Event from "../models/eventModel.js";

// 🔹 Error Handler
const handleError = (res, error, status = 500) => {
    res.status(status).json({ message: error.message });
};

// 🔹 Get All Events
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        handleError(res, err);
    }
};

// 🔹 Get Event by ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(Event);
    } catch (err) {
        handleError(res, err);
    }
};

// 🔹 Create an Event
export const createEvent = async (req, res) => {
    try {
        const { title, description, eventDate, startTime, endTime } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });

        // const [day, month, year] = eventDate.split("/"); // Split by "/"
        // eventDate = new Date(`${year}-${month}-${day}`);

        const newEvent = new Event({ title, description, eventDate, startTime, endTime });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        handleError(res, err);
    }
};

// 🔹 Update Event
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Only allow updating specified fields
        const allowedUpdates = ["title", "description", "eventDate", "startTime", "endTime"];
        const updateKeys = Object.keys(updates);
        const isValidUpdate = updateKeys.every(key => allowedUpdates.includes(key));

        if (!isValidUpdate) {
            return res.status(400).json({ message: "Invalid update fields" });
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });

        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

        res.json(updatedEvent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Delete Event
export const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedEvent = await Event.findByIdAndDelete(id);
  
      if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
      res.status(200).json({message: "Event deleted successfully.", Event: deletedEvent});
  
    } catch (err) {
      handleError(res, err);
    }
  };