import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: {
        type: String, 
        required: true, 
    },
    location: {
        type: String, 
        required: true, 
    },
    image: {
        type: String, 
        required: true,
        default: "",
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "employee", "user"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",  // Default is active when a user is created
    }
}, {
    timestamps: true,
});

// Hash password before saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Compare passwords
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model("User", userSchema);
export default User