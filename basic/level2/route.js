const express = require('express');
const router = express.Router();

const controllers = require('./controllers');

router.get("/", controllers.getAllProducts);
router.post("/", controllers.addProduct);
router.put("/:id", controllers.updateProduct);
router.delete("/:id", controllers.deleteProduct);
router.get("/:id", controllers.getProductById);

module.exports = router;