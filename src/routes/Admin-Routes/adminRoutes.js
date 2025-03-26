import express from "express";
import { activateAccount, createNewUser, deactivateAccount, deleteUser, getAllUsers, getUserById, getUserStatistics, updateUser } from "../../controllers/Admin-Functions/adminUserController.js";
import { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProductById } from "../../controllers/Admin-Functions/adminProductController.js";
import { verifyToken, authorizeRoles } from "../../middlewares/authMiddleware.js";
import { assignDuty, assignSalesLeadToEmployee, createEmployee, createSalesLead, deleteEmployeeById, getAllEmployees, getEmployeeById, updateEmployee, viewEmployeeDuties, getAllSalesLeads, addActionToLead, getEmployeeLeads } from "../../controllers/Admin-Functions/adminEmployeeController.js";
import { createCustomer, deleteCustomerById, getAllCustomers, getCustomerById, updateCustomerById } from "../../controllers/Admin-Functions/adminCustomerController.js";
import { uploadImage } from "../../controllers/uploadImages.js";

const adminRouter = express.Router();


// get all statistics
adminRouter.get('/stats', verifyToken, getUserStatistics);


// Admin CRUD operations
adminRouter.get('/users', getAllUsers);
adminRouter.post('/users', createNewUser);

adminRouter.get('/users/:id', getUserById);
adminRouter.patch('/users/:id', updateUser);
adminRouter.delete('/users/:id', deleteUser);

// admin customer functions
adminRouter.post('/customers', createCustomer);
adminRouter.get('/customers', getAllCustomers);

adminRouter.get('/customers/:id', getCustomerById);
adminRouter.patch('/customers/:id', updateCustomerById);
adminRouter.delete('/customers/:id', deleteCustomerById);
// Activate account (only admins)
adminRouter.patch('/customers/activate/:id', verifyToken, authorizeRoles("admin"), activateAccount);

// Deactivate account (only admins)
adminRouter.patch('/customers/deactivate/:id', verifyToken, authorizeRoles("admin"), deactivateAccount);


// Admin Products CRUD Operations
adminRouter.get('/products', getAllProducts);
adminRouter.post('/products', createNewProduct);

adminRouter.get('/products/:id', getProductById);
adminRouter.patch('/products/:id', updateProduct);
adminRouter.delete('/products/:id', deleteProduct);

// Admin employee functions 
adminRouter.get('/employee', verifyToken, authorizeRoles("admin"), getAllEmployees);
adminRouter.post('/employee', verifyToken, authorizeRoles("admin"), createEmployee);

adminRouter.patch('/employee/:id', verifyToken, authorizeRoles("admin"), updateEmployee);
adminRouter.get('/employee/:id', verifyToken, authorizeRoles("admin"), getEmployeeById);
adminRouter.delete('/employee/:id', verifyToken, authorizeRoles("admin"), deleteEmployeeById);

// Assign a new task to an employee
adminRouter.post('/employee/assignDuty', verifyToken, authorizeRoles("admin"), assignDuty);

// View tasks of a specific employee
adminRouter.get('/employee/tasks/:id', verifyToken, authorizeRoles("admin"), viewEmployeeDuties);

// sales leads
adminRouter.post('/employee/lead', verifyToken, authorizeRoles("admin"), createSalesLead);
adminRouter.get('/employee/leads/:employeeId', verifyToken, authorizeRoles("admin"), getEmployeeLeads);
adminRouter.get('/allLeads', verifyToken, authorizeRoles("admin"), getAllSalesLeads)
adminRouter.put('/employee/assign-lead', verifyToken, authorizeRoles("admin"), assignSalesLeadToEmployee);
adminRouter.put('/employee/add-action', verifyToken, authorizeRoles("admin"), addActionToLead);


// Upload images
adminRouter.post('/uploadImage', async (req, res) => {
    const { image } = req.body; // Assuming the image is being sent in base64 format in the request body

    if (!image) {
        return res.status(400).json({ error: "Image data is required" });
    }

    try {
        const imageUrl = await uploadImage(image); // Call the uploadImage function from Cloudinary logic
        res.status(200).json({ imageUrl }); // Return the secure image URL in response
    } catch (error) {
        console.error("Error uploading image:", error); // Log the error details
        res.status(500).json({ error: error.message }); // Handle errors
    }
});
export default adminRouter;