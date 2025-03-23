// userRoutes.js
import express from "express";
import { verifyToken, authorizeRoles } from "../middlewares/authMiddleware.js";
import { getUserStatistics } from '../controllers/adminController.js';

const userRoutes = express.Router();

// Only Admin can Access
userRoutes.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.username}` });
});

// Both admin and employee can access this router
userRoutes.get("/employee", verifyToken, authorizeRoles("admin", "employee"), (req, res) => {
  res.json({ message: `Welcome Employee ${req.user.username}` });
});

// All users can access this router
userRoutes.get("/user", verifyToken, authorizeRoles("admin", "employee", "user"), (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

userRoutes.get("/admin/stats", verifyToken, authorizeRoles("admin"), getUserStatistics);

export default userRoutes;
