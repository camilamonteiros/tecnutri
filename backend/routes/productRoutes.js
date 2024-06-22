const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const productController = require("../controllers/productController.js");

router.get("/", productController.getProducts);
router.post("/create", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/find/:name", productController.findProduct);

module.exports = router;
