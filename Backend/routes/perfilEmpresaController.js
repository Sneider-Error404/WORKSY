const express = require("express");

const router = express.Router();

const perfilEmpresaController = require("../controllers/perfilEmpresaController");

// crear un perfil de empresa
router.post("/", perfilEmpresaController.crearPerfilEmpresa);

// obtener un perfil de empresa
router.get("/:id", perfilEmpresaController.obtenerPerfilEmpresa);

// actualizar un perfil de empresa
router.put("/:id", perfilEmpresaController.actualizarPerfilEmpresa);

// eliminar perfil de empresa
router.delete("/:id", perfilEmpresaController.eliminarPerfilEmpresa);

module.exports = router;