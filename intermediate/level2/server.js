require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const routes = require('./route');
app.use("/api/v1", routes);

const connectToDB = require('./dbConfig');

connectToDB().then(() => {
    // Start Server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})