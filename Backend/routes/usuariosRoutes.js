const express = require("express");

const router = express.Router();

const usuariosController = require("../controllers/usuariosController");
const verificarToken = require("../middlewares/authMiddleware");

// Obtener un usuario
router.get("/:id", usuariosController.obtenerUsuario);

// Actualizar un usuario
router.put("/:id", verificarToken, usuariosController.actualizarUsuario);

// Eliminar un usuario
router.delete("/:id", usuariosController.eliminarUsuario);

module.exports = router;
