const express = require('express');

const routes = express.Router();

const productControllers = require('./productController');
const authControllers = require('./authController');

const {authenticateToken, authorizeRole} = require('./middleware');

routes.post("/register", authControllers.registerUser);
routes.post("/login", authControllers.loginUser)

routes.use(authenticateToken);

routes.route("/products")
    .get(productControllers.getAllProducts)
    .post(authorizeRole("admin"), productControllers.addProduct);

routes.route("/products/:id")
    .get(authorizeRole("admin"),productControllers.findProductById)
    .put(authorizeRole("admin"),productControllers.editProduct)
    .delete(authorizeRole("admin"),productControllers.deleteProduct);

module.exports = routes;