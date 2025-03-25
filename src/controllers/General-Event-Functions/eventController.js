import Event from "../../models/eventModel.js";

// 🔹 Error Handler
const handleError = (res, error, status = 500) => {
    res.status(status).json({ message: error.message });
};

// 🔹 Get All Events
export const getEvents = async (req, res) => {
    try {
        const userId = req.user._id;
        const events = await Event.find({user: userId});
        res.json(events);
    } catch (err) {
        handleError(res, err);
    }
};

// 🔹 Get Event by ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const event = await Event.findById({_id: id, user: userId});
        if (!event) return res.status(404).json({ message: "Event not found  or access denied" });
        res.json(event);
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
        const userId = req.user._id;

        const newEvent = new Event({ title, description, eventDate, startTime, endTime, user: userId });
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
        const UserId = req.user._id;

        const event = await Event.findOne({_id: id, user: UserId});
        if(!event) return res.status(404).json({ message: "Event not found or access denied" });

        // Only allow updating specified fields
        const allowedUpdates = ["title", "description", "eventDate", "startTime", "endTime"];
        const updateKeys = Object.keys(updates);
        const isValidUpdate = updateKeys.every(key => allowedUpdates.includes(key));

        if (!isValidUpdate) {
            return res.status(400).json({ message: "Invalid update fields" });
        }

        
        Object.assign(event, updates); // Update the event
        await event.save();
        
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Delete Event
export const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const UserId = req.user._id;
      const deletedEvent = await Event.findByIdAndDelete({_id: id, user: UserId});
  
      if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
      res.status(200).json({message: "Event deleted successfully.", Event: deletedEvent});
  
    } catch (err) {
      handleError(res, err);
    }
  };