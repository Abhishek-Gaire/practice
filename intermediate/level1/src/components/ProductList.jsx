function ProductList({ products, onEdit, onDelete, onRefresh }) {
    return (
        <div>
            <button
                onClick={onRefresh}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-green-700"
            >
                Fetch All Products
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-indigo-600">{product.name}</h3>
                        <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => onEdit(product.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(product.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;