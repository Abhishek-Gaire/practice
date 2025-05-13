import {useState, useEffect} from 'react';

function ProductForm({onSave, editingProduct, setEditingProduct}) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name);
            setPrice(editingProduct.price.toString());
        } else {
            setName('');
            setPrice('');
        }
    }, [editingProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price) {
            alert('Please fill in all fields.');
            return;
        }
        onSave({name, price: parseFloat(price)});
    };

    const handleClear = () => {
        setName('');
        setPrice('');
        setEditingProduct(null);
    };

    return (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    step="0.01"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;