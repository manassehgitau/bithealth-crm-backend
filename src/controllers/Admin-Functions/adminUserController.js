import Customer from '../../models/customerModel.js';
import Employee from '../../models/employeeModel.js';
import User from '../../models/userModel.js';

// 🔹 Error Handler
const handleError = (res, error, status = 500) => {
  res.status(status).json({ message: error.message });
};

// get all stats for the users
export const getUserStatistics = async (req, res) => {
  try {
    // Count all users
    const totalUsers = await User.countDocuments();
    
    // Count employees
    const totalEmployees = await Employee.countDocuments();
    
    // Count regular users (role = user)
    const totalCustomers = await Customer.countDocuments({ role: "user" });

    res.status(200).json({
      totalUsers,
      totalEmployees,
      totalCustomers,
    });

  } catch (err) {
    handleError(res, err)
  }
};

// get all users
export const getAllUsers = async (req, res) => {

  try{
    const users = await User.find();
    res.status(200).json(users);
  }
  catch(err) {
    handleError(res, err)
  }
};

// create new user
export const createNewUser = async(req, res) => {
  const { username, email, password, role, phone, location, image } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, email, password, role, phone, location, image });
    await user.save();

    res.json({ message: "registration successful", user: { id: user._id, name: user.username, email: user.email, role: user.role, tel: user.phone, location: user.location, image: user.image } });

  } catch (err) {
    handleError(res, err);
  }
};

// 🔹 Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById({_id: id});
        if (!user) return res.status(404).json({ message: "User not found  or access denied" });
        res.json(user);
    } catch (err) {
        handleError(res, err);
    }
};

//  update User 
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Only allow updating specified fields
    const allowedUpdates = ["username", "email", "password", "role", "phone", "location"];
    const updateKeys = Object.keys(updates);
    const isValidUpdate = updateKeys.every(key => allowedUpdates.includes(key));

    if (!isValidUpdate) {
        return res.status(400).json({ message: "Invalid update fields" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
    });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);

  } catch (err) {
    handleError(res, err)
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({message: "User deleted successfully.", User: deletedUser});
  
  } catch (error) {
    
  }
}

// Activate a user account
export const activateAccount = async (req, res) => {
  try {
      const { id } = req.params;

      // Find the user and update the status to active
      const user = await User.findByIdAndUpdate({_id: id}, { status: "active" }, { new: true });

      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ message: "User account activated successfully", user });
  } catch (error) {
      handleError(res, error);
  }
};

// Deactivate a user account
export const deactivateAccount = async (req, res) => {
  try {
      const { id } = req.params;

      // Find the user and update the status to inactive
      const user = await User.findByIdAndUpdate({_id: id}, { status: "inactive" }, { new: true },);

      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ message: "User account deactivated successfully", user });
  } catch (error) {
      handleError(res, error);
  }
};