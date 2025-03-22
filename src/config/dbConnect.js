import mongoose from "mongoose";

const dbConnect = async() => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to MongoDB database successfully");
        console.log(`Database Connected: ${connect.connection.host}, ${connect.connection.name}`);
    } catch (error) {
        console.error("Error:", err);
        process.exit(1);
    }
    
};

export default dbConnect