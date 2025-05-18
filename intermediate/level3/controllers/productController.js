const {Product,User} = require('../dbModels');
const {productSchema} = require("../validationSchema");

// Get all products (public access, optimized with attributes and limit)
const getAllProducts = async(req,res,next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price'],
      include: [{ model: User, attributes: ['username'] }],
      limit: 100,
    });
    res.status(200).json(products);
  } catch (error) {
    next(new Error('Failed to fetch products.'));
  }
}

// Get a single product by ID (optimized with specific attributes)
const getProductById = async(req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: ['id', 'name', 'price', 'userId'],
      include: [{ model: User, attributes: ['username'] }],
    });
    if (!product) return next(new Error('Product not found.'));
    res.status(200).json(product);
  } catch (error) {
    next(new Error('Failed to fetch product.'));
  }
}

// Create a product (admin only, with validation)
const addProduct = async (req,res,next) => {
  const { error } = productSchema.validate(req.body);
  if (error) return next(new Error(error.details[0].message));

  const { name, price } = req.body;
  try {
    const product = await Product.create({ name, price, userId: req.user.id });
    res.status(201).json(product);
  } catch (error) {
    next(new Error('Failed to create product.'));
  }
}

// Update a product (admin only, with validation)
const updateProduct = async(req,res,next) => {
  const { error } = productSchema.validate(req.body);
  if (error) return next(new Error(error.details[0].message));

  const { name, price } = req.body;
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return next(new Error('Product not found.'));
    await product.update({ name, price });
    res.status(200).json(product);
  } catch (error) {
    next(new Error('Failed to update product.'));
  }
}

// Delete a product (admin only)
const deleteProduct = async(req,res,next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return next(new Error('Product not found.'));
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    next(new Error('Failed to delete product.'));
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
}