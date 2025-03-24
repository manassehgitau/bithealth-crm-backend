import express from 'express'
import { verifyToken, authorizeRoles } from "../../middlewares/authMiddleware.js";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from '../../controllers/General-Event-Functions/eventController.js';

const eventRouter = express.Router();

eventRouter.get("/", verifyToken, authorizeRoles("admin", "employee", "user"), getEvents );
eventRouter.post("/", verifyToken, authorizeRoles("admin", "employee", "user"), createEvent);

eventRouter.get("/:id", verifyToken, authorizeRoles("admin", "employee", "user"), getEventById);
eventRouter.patch("/:id", verifyToken, authorizeRoles("admin", "employee", "user"), updateEvent);  
eventRouter.delete("/:id", verifyToken, authorizeRoles("admin", "employee", "user"), deleteEvent);

export default eventRouter