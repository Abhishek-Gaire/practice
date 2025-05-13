import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

import './index.css'

const API_URL = import.meta.env.VITE_BACKEND_URI;

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch a single product by ID for editing
    const fetchProductById = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            setEditingProduct(response.data);
        } catch (err) {
            setError('Failed to fetch product. Please try again.');
        }
    };

    // Add or update a product
    const saveProduct = async (productData) => {
        setLoading(true);
        setError(null);
        try {
            if (editingProduct) {
                // Update product (PUT)
                await axios.put(`${API_URL}/${editingProduct.id}`, productData);
            } else {
                // Add new product (POST)
                await axios.post(API_URL, productData);
            }
            setEditingProduct(null);
            await fetchProducts(); // Refresh the list
        } catch (err) {
            setError('Failed to save product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchProducts(); // Refresh the list
        } catch (err) {
            setError('Failed to delete product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts().then(() => {
            console.log("Fetched Successfully")
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Product Management</h1>

                {loading && <div className="text-center text-indigo-600 mb-4">Loading...</div>}
                {error && <div className="text-center text-red-600 mb-4">{error}</div>}

                {/* Form for adding/editing products */}
                <ProductForm
                    onSave={saveProduct}
                    editingProduct={editingProduct}
                    setEditingProduct={setEditingProduct}
                />

                {/* Product list */}
                <ProductList
                    products={products}
                    onEdit={fetchProductById}
                    onDelete={deleteProduct}
                    onRefresh={fetchProducts}
                />
            </div>
        </div>
    );
}

export default App;