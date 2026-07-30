const express = require("express");

const router = express.Router();

const postulacionesController = require("../controllers/postulacionesController");

//crear postulacion
router.post("/", postulacionesController.crearPostulacion);

//obtener postulacion 
router.get("/:id", postulacionesController.obtenerPostulacion);

//actualizar postulacion
router.put("/:id", postulacionesController.actualizarPostulacion);

//eliminar postulacion
router.delete("/:id", postulacionesController.eliminarPostulacion);

module.exports = router;