import Customer from '../../models/customerModel.js';
import Product from '../../models/productModel.js';  // Assuming you have a Product model


// Controller to create a new customer
export const createCustomer = async (req, res) => {
    try {
        const {
            username, password, email, phone, location, image,
            analytics, products
        } = req.body;

        // Ensure that the provided products exist in the database
        const productRecords = await Product.find({ _id: { $in: products } });

        if (productRecords.length !== products.length) {
            return res.status(400).json({ message: "Some products are invalid or missing." });
        }

        // Create a new customer with required fields from User and Customer schemas
        const newCustomer = new Customer({
            username,
            password,
            email,
            phone,
            location,
            image,
            analytics,
            products
        });

        // Save the new customer
        await newCustomer.save();

        res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all customers
export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find(); // Populate related fields if needed
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get customer by ID
export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id); // Populate related fields if needed

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update customer by ID
export const updateCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            username, email, phone, location, image, analytics, products
        } = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            {
                username,
                email,
                phone,
                location,
                image,
                analytics,
                products
            },
            { new: true, runValidators: true } // new: true returns the updated document
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete customer by ID
export const deleteCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Activate a user account
export const activateAccount = async (req, res) => {
  try {
      const { id } = req.params;

      // Find the user and update the status to active
      const user = await Customer.findByIdAndUpdate({_id: id}, { status: "active" }, { new: true });

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
      const user = await Customer.findByIdAndUpdate({_id: id}, { status: "inactive" }, { new: true },);

      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ message: "User account deactivated successfully", user });
  } catch (error) {
      handleError(res, error);
  }
};