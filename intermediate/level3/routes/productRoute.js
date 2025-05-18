const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const {authenticateToken,authorizeRole} = require("../middleware")
const productControllers = require("../controllers/productController");

router.get("/",productController.getAllProducts);

router.use(authenticateToken);

router.get("/:id",productController.getProductById);

router.post("/",authorizeRole("admin"), productControllers.addProduct);
router.put("/:id",authorizeRole("admin"),productControllers.updateProduct);
router.delete("/:id",authorizeRole("admin"),productControllers.deleteProduct);

module.exports = router;