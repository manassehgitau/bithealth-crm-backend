import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        description: { 
          type: String,
           default: "" 
        },
        eventDate: { 
            type: String, 
            required: true 
        },
        startTime: { 
            type: String, 
            required: true 
        },
        endTime: { 
            type: String, 
            required: true 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true,
        },
    },
    { timestamps: true }

);

const Event = mongoose.model("Event", eventSchema);

export default Event