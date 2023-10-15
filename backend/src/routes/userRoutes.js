const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware.verifyAuthToken, userController.getAllUsers);
router.get("/:id", authMiddleware.verifyAuthToken, userController.getUserById);
router.put("/:id", authMiddleware.verifyAuthToken, userController.updateUser);
router.delete("/:id",authMiddleware.verifyAuthToken,userController.deleteUser);

module.exports = router;
