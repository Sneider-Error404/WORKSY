const express = require("express");

const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

const verificarToken = require("../middlewares/authMiddleware");

router.get(
    "/perfil",
    verificarToken,
    usuariosController.obtenerUsuario
);

router.put(
    "/perfil",
    verificarToken,
    usuariosController.actualizarUsuario
);

router.delete(
    "/:id",
    verificarToken,
    usuariosController.eliminarUsuario
);

module.exports = router;