const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/clientController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/", authMiddleware, ClientController.getClients );
router.post("/create", authMiddleware, ClientController.createClient );
router.put("/update/:id_cliente", authMiddleware, ClientController.updateClient);
router.delete("/delete/:id_cliente", authMiddleware, ClientController.deleteClient);
router.get("/find/:id_cliente", authMiddleware, ClientController.findClient);

module.exports = router;
