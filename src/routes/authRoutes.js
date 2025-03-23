import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { verifyToken, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protect this route with authentication and restrict access to "admin" users only
router.get("/me", verifyToken, authorizeRoles("admin", "user"), getMe); // Allow both "admin" and "user" roles


export default router;
