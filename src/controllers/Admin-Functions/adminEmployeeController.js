import Duty from "../../models/dutyModel.js";
import Employee from "../../models/employeeModel.js";
import User from "../../models/userModel.js";
import Lead from '../../models/leadModel.js';

// 🔹 Error Handler
const handleError = (res, error, status = 500) => {
    res.status(status).json({ message: error.message });
};


// create new Employee
export const createEmployee = async (req, res) => {
    try {
        // Extract employee data from the request body
        const { username, password, email, phone, location, image, accountNumber, accountHost } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: "User with the same username or email already exists." });
        }

        // Create a new employee (inheriting from the User model)
        const employee = new Employee({
            username,
            password,
            email,
            phone,
            location,
            image,
            AccountNumber: accountNumber,
            AccountHost: accountHost,
            role: 'employee',  // Set the role to 'employee'
        });

        // Save the employee to the database
        await employee.save();

        res.status(201).json({ message: 'Employee created successfully', employee });

    } catch (err) {
        handleError(res, err);
    }
}

// get all employee
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ message: 'Employees retrieved successfully', employees });
    } catch (err) {

        handleError(res, err);
    }
}
// Controller to update employee details
export const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updates = req.body; // Data from the request body

        // Use the option { new: true, runValidators: true } to ensure validation runs and returns updated document
        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            { $set: updates },  // Set the fields provided in the request
            { new: true, runValidators: true, omitUndefined: true } // Avoids validation for undefined fields
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
        res.status(400).json({ message: "Error updating employee details", error });
    }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the employee by ID and populate relevant fields like salesLeads or duty if necessary
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete employee by ID
export const deleteEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the employee
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Assign a new task to an employee
export const assignDuty = async (req, res) => {
    try {
        const { employeeId, title, description, deadline } = req.body;

        // Create a new task
        const duty = new Duty({
            title,
            description,
            assignedTo: employeeId,
            deadline
        });

        // Save the task
        await duty.save();

        // Add task to employee's task array
        await Employee.findByIdAndUpdate(employeeId, {
            $push: { duty: { dutyId: duty._id, taskDetails: description, deadline } }
        });

        res.status(201).json({ message: "Duty assigned successfully", duty });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// View all duties for a specific employee
export const viewEmployeeDuties = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the employee and populate the duty array
        const employee = await Employee.findById(id).populate({
            path: 'duty.dutyId',  // Populate the duty array with the details from the Duty model
            model: 'Duty'
        });

        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.status(200).json({ duties: employee.duty });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new sales lead
export const createSalesLead = async (req, res) => {
    try {
        const { customerId, leadDetails } = req.body;

        const lead = new Lead({
            customerId,
            leadDetails,
        });

        await lead.save();
        res.status(201).json({ message: "Sales lead created successfully", lead });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Assign a new sales lead to an employee
export const assignSalesLeadToEmployee = async (req, res) => {
    try {
        const { employeeId, leadId, leadDetails, leadStatus } = req.body;

        // Find the lead in the Lead model
        const lead = await Lead.findById(leadId);
        if (!lead) return res.status(404).json({ message: "Lead not found" });

        // Find the employee and update their salesLeads array
        const employee = await Employee.findByIdAndUpdate(
            employeeId,
            {
                $push: {
                    salesLeads: {
                        leadId: lead._id,
                        leadDetails: leadDetails || lead.leadDetails,  // Use the provided leadDetails or the default one from the lead
                        leadStatus: leadStatus || 'Contacted',  // Default leadStatus if not provided
                    }
                }
            },
            { new: true, runValidators: true }
        );

        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.status(200).json({ message: "Sales lead assigned successfully", employee });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Add action taken to a sales lead
export const addActionToLead = async (req, res) => {
    try {
        const { leadId, employeeId, actionType, actionDetails } = req.body;

        // Find the lead and verify if it exists
        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        // Check if the employee is authorized to take actions (you can customize this check as needed)
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Add the action to the lead
        lead.actionsTaken.push({
            actionType,
            actionDetails,
        });

        // Save the updated lead
        await lead.save();

        res.status(200).json({ message: "Action added successfully", lead });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all sales leads for a specific employee
export const getEmployeeLeads = async (req, res) => {
    try {
        const { employeeId } = req.params;

        // Find the employee and populate the salesLeads array with lead details
        const employee = await Employee.findById(employeeId).populate({
            path: 'salesLeads.leadId',
            model: 'Lead',  // This ensures we are populating lead details from the Lead model
        });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Send the employee's sales leads
        res.status(200).json({ salesLeads: employee.salesLeads });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// View all sales leads
export const getAllSalesLeads = async (req, res) => {
    try {
        const leads = await Lead.find().populate('customerId', 'username email');
        if (leads.length === 0) {
            return res.status(404).json({ message: "No sales leads found" });
        }
        res.status(200).json({ message: "Sales leads retrieved successfully", leads });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};