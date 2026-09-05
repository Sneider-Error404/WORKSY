const express = require("express");

const router = express.Router();

const perfilEmpresaController = require("../controllers/perfilEmpresaController");

const verificarToken = require("../middlewares/authMiddleware");

// Crear mi perfil de empresa
router.post(
    "/",
    verificarToken,
    perfilEmpresaController.crearPerfilEmpresa
);

// Obtener mi perfil de empresa
router.get(
    "/mio",
    verificarToken,
    perfilEmpresaController.obtenerPerfilEmpresa
);

// Actualizar mi perfil de empresa
router.put(
    "/mio",
    verificarToken,
    perfilEmpresaController.actualizarPerfilEmpresa
);

// Eliminar mi perfil de empresa
router.delete(
    "/mio",
    verificarToken,
    perfilEmpresaController.eliminarPerfilEmpresa
);

module.exports = router;