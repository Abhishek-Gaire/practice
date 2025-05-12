const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

const productRouter = require('./route');
app.use('/api/v1/products', productRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});