require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error: err.message || 'Something went wrong on the server.'});
});

const authRoutes = require('./routes/authRoute');
const productRoutes = require('./routes/productRoute');

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/page", productRoutes);
// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at ${new Date().toLocaleString('en-US', {timeZone: 'Asia/Kathmandu'})}`);
});