const express = require("express");
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware.verifyAuthToken, ticketController.getAllTickets);
router.get("/:id",authMiddleware.verifyAuthToken,ticketController.getTicketById);
router.post("/", authMiddleware.verifyAuthToken, ticketController.createTicket);
router.put("/:id",authMiddleware.verifyAuthToken,ticketController.updateTicket);
router.delete("/:id",authMiddleware.verifyAuthToken,ticketController.deleteTicket);

module.exports = router;
