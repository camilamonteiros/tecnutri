const express = require("express");
const router = express.Router();
const productLineController = require("../controllers/productLineController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/", authMiddleware, productLineController.getProductsLines );
router.post("/create", authMiddleware, productLineController.createProductLine );
router.put("/update/:id_linha", authMiddleware, productLineController.updateProductLine);
router.delete("/delete/:id_linha", authMiddleware, productLineController.deleteProductLine);
router.get("/find/:id_linha", authMiddleware, productLineController.findProductLine);

module.exports = router;