import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from "./routes/Event-Routes/eventRoutes.js";
import adminRoutes from "./routes/Admin-Routes/adminRoutes.js"


dotenv.config();
const app = express();
dbConnect();

// middleware
app.use(express.json());
app.use(cors());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes)


// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});