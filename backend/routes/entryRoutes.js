const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const entryController = require("../controllers/entryController.js");

router.get("/", authMiddleware, entryController.getEntrys );
router.post("/create", authMiddleware, entryController.createEntry);
router.put("/update/:id_entrada", authMiddleware, entryController.updateEntry);
router.delete("/delete/:id_entrada", authMiddleware, entryController.deleteEntry);
router.get("/find/:id_entrada", authMiddleware, entryController.findEntry);

module.exports = router;