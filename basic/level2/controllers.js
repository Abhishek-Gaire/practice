// In-memory array to store products for level1
let products = [
    {id: 1, name: 'Laptop', price: 999.99},
    {id: 2, name: 'Phone', price: 499.99},
];

// Helper function to find product by ID
const findProductById = (id) => products.find(product => product.id === parseInt(id));

const getAllProducts = (req, res) => {
    try {
        if (products.length === 0 || !products) {
            return res.status(404).json({error: "No products found."});
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getProductById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = findProductById(id);
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const addProduct = (req, res) => {
    try {
        const {name, price} = req.body;
        if (!name || !price) {
            return res.status(400).json({error: 'Name and price are required'});
        }
        const newProduct = {
            id: products.length + 1,
            name,
            price: parseFloat(price)
        };
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const updateProduct = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({
                error: "Product Id Required"
            })
        }
        const product = findProductById(id);
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }

        const {name, price} = req.body;
        if (name) product.name = name;
        if (price) product.price = parseFloat(price);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const deleteProduct = (req, res) => {
    try{
        const id = parseInt(req.params.id);
        if(!id){
            return res.status(400).json({error: 'Product Id Required'});
        }

        const productIndex = products.findIndex(product => product.id === id)
        if(productIndex === -1) {
            return res.status(404).json({error: 'Product not found'});
        }

        products.splice(productIndex, 1);
        res.status(200).json({
            message: 'Product Deleted Successfully'
        });
    }catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}