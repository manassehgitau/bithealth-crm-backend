import mongoose, { Schema } from "mongoose";
import User from "./userModel";

const adminSchema = new mongoose.Schema({
    
}, {
    timestamps: true,
});

const Admin = User.discriminator('Admin', adminSchema);
export default Admin;