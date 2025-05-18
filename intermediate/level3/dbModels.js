const { DataTypes } = require('sequelize');
const sequelize = require('./dbConfig');
// User Model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']],
    },
  },
}, {
  indexes: [
    { unique: true, fields: ['username'] },
  ],
});

// Product Model
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100],
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  indexes: [
    { fields: ['name'] },
    { fields: ['userId'] },
    { fields: ['price'] },
  ],
});

// Define Relationships
User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });

// Sync models with database
sequelize.sync({ alter: true })
  .then(() => console.log('Tables synced'))
  .catch(err => console.error('Sync error:', err));

module.exports = {
  User,
  Product,
}