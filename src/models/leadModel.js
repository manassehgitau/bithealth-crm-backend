import mongoose, { Schema } from 'mongoose';

const leadSchema = new mongoose.Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a customer model
        required: true,
    },
    leadDetails: {
        type: String,
        required: true,
    },
    leadStatus: {
        type: String,
        required: true,
        enum: ['Contacted', 'Negotiation', 'Closed'], // Add additional stages as needed
        default: 'Contacted',
    },
    actionsTaken: [{
        actionType: { type: String }, // Example: "Phone Call", "Email"
        actionDetails: { type: String }, // Details of the action
        actionDate: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
