const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').default('user'),
});

const productSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  price: Joi.number().positive().precision(2).required(),
});

module.exports = {
  userSchema,
  productSchema
}