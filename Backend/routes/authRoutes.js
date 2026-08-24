const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const verificarToken = require("../middlewares/authMiddleware");

router.get("/test", authController.test);

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/protegida", verificarToken, (req, res) => {
    res.json({
        mensaje: "Acceso autorizado.",
        usuario: req.usuario
    });
});

module.exports = router;