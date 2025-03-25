import mongoose from "mongoose";
import User from "./userModel.js";

const customerSchema = new mongoose.Schema({
    analytics : [{
        heartRate: {
            type: Number,
            required: true,
        },
        kmsCovered: {
            type: Number,
            required: true
        },
        steps: {
            type: Number,
            required: true,
        }, 
        caloriesBurned: {
            type: Number,
            required: true,
        }
    }], 
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Reference to the Product model
        required: true   // Ensure at least one product is linked
    }],
}, {
    timestamps: true,
});

// Middleware to check if the customer has at least one product
customerSchema.pre('save', function (next) {
    if (this.products.length === 0) {
        return next(new Error('Customer must have at least one product.'));
    }
    next();
});

const Customer = User.discriminator('Customer', customerSchema);
export default Customer;