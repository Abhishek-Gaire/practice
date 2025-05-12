const API_URL = 'http://localhost:3000/api/v1/products';

// Fetch all products and display them
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        showError('Error loading products. Please try again later.');
    }
}

// Fetch a single product by ID and populate the form for editing
async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const product = await response.json();
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
    } catch (error) {
        console.error('Error fetching product:', error);
        showError('Error loading product. Please try again.');
    }
}

// Add or update a product
async function addOrUpdateProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;

    if (!name || !price) {
        showError('Please fill in all fields.');
        return;
    }

    const productData = { name, price: parseFloat(price) };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error('Failed to save product');
        clearForm();
        await fetchProducts(); // Refresh the product list
    } catch (error) {
        console.error('Error saving product:', error);
        showError('Error saving product. Please try again.');
    }
}

// Delete a product by ID
async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok && response.status !== 204) throw new Error('Failed to delete product');
        await fetchProducts(); // Refresh the product list
    } catch (error) {
        console.error('Error deleting product:', error);
        showError('Error deleting product. Please try again.');
    }
}

// Display products in the UI
function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white p-4 rounded-lg shadow-md';
        productCard.innerHTML = `
      <h3 class="text-lg font-semibold text-indigo-600">${product.name}</h3>
      <p class="text-gray-600">Price: $${product.price.toFixed(2)}</p>
      <div class="mt-4 flex gap-2">
        <button onclick="fetchProductById(${product.id})" class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">Edit</button>
        <button onclick="deleteProduct(${product.id})" class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">Delete</button>
      </div>
    `;
        container.appendChild(productCard);
    });
}

// Clear the form
function clearForm() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
}

// Show error message (temporary alert for simplicity)
function showError(message) {
    alert(message);
}