import express from "express";
import { activateAccount, deactivateAccount, getUserStatistics } from "../../controllers/Admin-Functions/adminUserController.js";
import { verifyToken, authorizeRoles, isAdmin } from "../../middlewares/authMiddleware.js";

const adminRouter = express.Router();

// Activate account (only admins)
adminRouter.patch('/activate/:id', verifyToken, authorizeRoles("admin"), isAdmin, activateAccount);

// Deactivate account (only admins)
adminRouter.patch('/deactivate/:id', deactivateAccount);

adminRouter.get('/stats', verifyToken, getUserStatistics);

export default adminRouter;