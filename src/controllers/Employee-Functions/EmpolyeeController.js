import Employee from '../../models/employeeModel';
import User from '../../models/userModel';

// @desc Create a new employee
// @route POST /api/employees
// @access Admin
export const createEmployee = async (req, res) => {
    try {
        const { username, password, email, phone, location, AccountNumber, AccountHost } = req.body;

        // Create new employee user
        const employee = new Employee({
            username,
            password,
            email,
            phone,
            location,
            role: "employee",
            AccountNumber,
            AccountHost
        });

        await employee.save();

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            employee
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc Get all employees
// @route GET /api/employees
// @access Admin
export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('salesLeads').populate('event');

        res.status(200).json({
            success: true,
            employees
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc Get single employee
// @route GET /api/employees/:id
// @access Admin/Employee
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('salesLeads').populate('event');

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.status(200).json({ success: true, employee });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc Update employee details
// @route PUT /api/employees/:id
// @access Admin
export const updateEmployee = async (req, res) => {
    try {
        const updatedData = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.status(200).json({
            success: true,
            message: "Employee details updated",
            employee
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc Delete an employee
// @route DELETE /api/employees/:id
// @access Admin
export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.status(200).json({ success: true, message: "Employee deleted" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc Add a sales lead for an employee
// @route POST /api/employees/:id/sales-lead
// @access Employee
export const addSalesLead = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const { leadId, leadStatus, leadDetails } = req.body;

        employee.salesLeads.push({ leadId, leadStatus, leadDetails });
        await employee.save();

        res.status(200).json({ success: true, message: "Sales lead added", employee });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc Assign an event to an employee
// @route POST /api/employees/:id/event
// @access Admin
export const assignEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const employee = await Employee.findById(req.params.id);
        
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        employee.event = eventId;
        await employee.save();

        res.status(200).json({ success: true, message: "Event assigned", employee });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
