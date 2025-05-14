const Product = require('./models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

const findProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById({_id: id});
        if (!product) {
            return res.status(404).json({error: 'Product not found.'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

const addProduct = async (req, res) => {
    const {name, price} = req.body;
    if (!name || !price) {
        return res.status(400).json({error: 'Name and price are required.'});
    }
    try {
        const product = new Product({name, price});
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

const editProduct = async (req, res) => {
    const {name, price} = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {name, price}, {new: true, runValidators: true});
        if (!product) {
            return res.status(404).json({error: 'Product not found.'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

const deleteProduct = async(req,res) =>{
    try{
        const id =req.params.id;
        if(!id){
            return res.status(404).json({error: 'Product not found.'});
        }
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({error: 'Product not found.'});
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({error: error});
    }
}

module.exports = {
    getAllProducts,
    deleteProduct,
    addProduct,
    editProduct,
    findProductById,
}