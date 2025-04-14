import mongoose, { Schema } from "mongoose";
import User from "./userModel";

const adminSchema = new mongoose.Schema(
  {
    adminRole: {
      type: String,
      required: true,
      enum: ["admin", "superAdmin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const Admin = User.discriminator("Admin", adminSchema);
export default Admin;
