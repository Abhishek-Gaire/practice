const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {User} = require("../dbModels");
const {userSchema} = require("../validationSchema")

// Register User
const registerUser = async (req, res, next) => {

  const {error} = userSchema.validate(req.body);
  if (error) return next(new Error(error.details[0].message));

  const {username, password, role} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, password: hashedPassword, role});
    res.status(201).json({message: 'User registered successfully.', id: user.id});
  } catch (error) {
    next(new Error('Registration failed.' + (error.name === 'SequelizeUniqueConstraintError' ? ' Username already exists.' : '')));
  }
}

// Login User
const loginUser = async(req,res,next) => {
  const {error} = userSchema.validate(req.body, {stripUnknown: true});
  if (error) return next(new Error(error.details[0].message));

  const {username, password} = req.body;
  try {
    const user = await User.findOne({where: username});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new Error('Invalid credentials.'));
    }
    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
  } catch (error) {
    next(new Error('Login failed.'));
  }
}

module.exports = {
  registerUser,
  loginUser
}