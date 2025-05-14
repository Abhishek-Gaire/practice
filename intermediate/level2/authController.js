const User = require('./models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const registerUser = async (req, res) => {
  const {username, password, role} = req.body;

  if (!username || !password) {
    return res.status(400).send({error: 'Username or password is required'});
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      password: hashedPassword,
      role: role || "user"
    })
    if (!user) {
      return res.status(400).send({error: 'User not Created'});
    }
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(401).json({error: 'Can Not Save User'});
    }
    res.status(200).json({message: 'User registered successfully.'});
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
}

const loginUser = async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return res.status(400).send({error: 'Username or password is required'});
  }

  try {
    const user = await User.findOne({username: username});
    if (!user) {
      return res.status(404).json({error: 'User is not found'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({error: 'Invalid Credentials.'});
    }

    const userToken = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({userToken});
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
}
module.exports = {
  registerUser,
  loginUser
}