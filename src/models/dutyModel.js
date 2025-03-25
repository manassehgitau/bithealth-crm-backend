import mongoose from "mongoose";

const dutySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    deadline: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
});

const Duty = mongoose.model("Duty", dutySchema);
export default Duty;
