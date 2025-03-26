import Product from '../../models/productModel.js'
import { uploadImage } from '../uploadImages.js';

const handleError = (res, error, status = 500) => {
    res.status(status).json({ message: error.message });
};

export const getProductStatistics = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();

        res.status(200).json({ totalProducts });
    } catch (err) {
        handleError(res, err);
    }
}

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        handleError(res, err);
    }
}


// 🔹 Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById({_id: id});
        if (!product) return res.status(404).json({ message: "Product not found  or access denied" });
        res.json(product);
    } catch (err) {
        handleError(res, err);
    }
};

// create new Product
export const createNewProduct = async (req, res) => {
    const { name, description, price, stock, features, image } = req.body;
  
    if (!name || !description || !price || !stock || !features || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const existingProduct = await Product.findOne({ name });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product already exists' });
      }
  
      // Upload image to Cloudinary
      const uploadedImageUrl = await uploadImage(image);
  
      // Create a new product with the uploaded image URL
      const product = new Product({
        name,
        description,
        price,
        stock,
        features,
        image: uploadedImageUrl,
      });
  
      await product.save();
  
      res.json({
        message: 'Registration successful',
        product: {
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          features: product.features,
          image: product.image,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// update existing product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const allowedUpdates = ['name', 'description', 'price', 'stock', 'features', 'image'];
    const updateKeys = Object.keys(updates);
    const isValidUpdate = updateKeys.every(key => allowedUpdates.includes(key));

    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Invalid update fields' });
    }

    // Check if the image needs to be updated
    if (updates.image) {
      updates.image = await uploadImage(updates.image);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({message: "Product deleted successfully.", product: deletedProduct});
  } catch (error) {
    
  }
}

