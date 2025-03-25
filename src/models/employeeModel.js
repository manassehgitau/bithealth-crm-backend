import mongoose, { Schema } from "mongoose";
import User from "./userModel.js";

const employeeSchema = new mongoose.Schema({
    salesLeads: [{
        leadId: {
            type: Schema.Types.ObjectId, 
            ref: 'Lead',
            required: true,
        },
        leadStatus: {
            type: String,
            required: true,
            enum: ['Contacted', 'Negotiation', 'Closed'],
            default: 'Contacted',
        },
        leadDetails: {
            type: String,
            required: true,
        },
    }],
    duty: [{
        dutyId: {
            type: Schema.Types.ObjectId,
            ref: "Duty",
            required: true,
        },
        dutyStatus: {
            type: String,
            required: true,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },
        dutyDetails: {
            type: String,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        }
    }],
    AccountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    AccountHost: {
        type: String,
        required: true,
    }
});

const Employee = User.discriminator("Employee", employeeSchema);
export default Employee;