const express = require("express");

const router = express.Router();

const vacantesController = require("../controllers/vacantesController");

// Crear una vacante
router.post("/", vacantesController.crearVacante);

// Obtener todas las vacantes
router.get("/", vacantesController.obtenerVacantes);

// Buscar vacantes por título y filtros
router.get("/buscar", vacantesController.buscarVacantes);

// Obtener una vacante
router.get("/:id", vacantesController.obtenerVacante);

// Actualizar una vacante
router.put("/:id", vacantesController.actualizarVacante);

// Eliminar una vacante
router.delete("/:id", vacantesController.eliminarVacante);

module.exports = router;