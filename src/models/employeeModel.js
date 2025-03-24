import mongoose, { Schema } from "mongoose";
import User from "./userModel";

const employeeSchema = new mongoose.Schema({
    salesLeads: [{
        leadId: {
            type: Schema.Types.ObjectId, 
            ref: 'customer',
            required: true,
        },
        leadStatus: {
            type: String,
            required: true,
            enum: ["Interested", "contacted", "closed"],
        },
        leadDetails: {
            type: String,
            required: true,
        },
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