import express from 'express'
import verifyToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const userRoutes = express.Router();

// Only Admin can Access
userRoutes.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({message: "welcome Admin"});
});

// Both admin and manager can access this router
userRoutes.get("/employee", verifyToken, authorizeRoles("admin", "employee"), (req, res) => {
    res.json({message: "welcome Employee"});
});

// All can access this router
userRoutes.get("/user", verifyToken, authorizeRoles("admin", "employee", "user"), (req, res) => {
    res.json({message: "welcome User"});
});

export default userRoutes;