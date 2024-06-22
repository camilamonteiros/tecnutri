const express = require("express");
const router = express.Router();
const batchController = require("../controllers/batchController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/", authMiddleware, batchController.getBatchs);
router.post("/create", authMiddleware, batchController.createBatch);
router.put("/update/:id", authMiddleware, batchController.updateBatch);
router.delete("delete/:id", authMiddleware, batchController.deleteBatch);
router.get("/name/:name", authMiddleware, batchController.findBatch);

module.exports = router;
