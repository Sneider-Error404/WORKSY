const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/test", authController.test);

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
