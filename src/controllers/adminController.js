import User from '../models/userModel.js';

export const getUserStatistics = async (req, res) => {
  try {
    // Count all users
    const totalUsers = await User.countDocuments();
    
    // Count employees
    const totalEmployees = await User.countDocuments({ role: "employee" });
    
    // Count regular users (role = user)
    const totalRegularUsers = await User.countDocuments({ role: "user" });

    res.status(200).json({
      totalUsers,
      totalEmployees,
      totalRegularUsers
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user statistics", error: error.message });
  }
};
