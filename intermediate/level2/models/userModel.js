const mongoose = require('mongoose');

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin']}
});
const User = mongoose.model('User', userSchema);

module.exports = User;