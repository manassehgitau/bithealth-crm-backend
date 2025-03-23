import mongoose, { Schema } from "mongoose";
import User from "./userModel";

const adminSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
}, {
    timestamps: true,
});

const Admin = User.discriminator('Admin', adminSchema);
export default Admin;