const express = require('express');

const router = express.Router();

const serviciosController = require('../controllers/serviciosController');

//crear servicio
router.post('/', serviciosController.crearServicio);

//obtener todos los servicios
router.get('/', serviciosController.obtenerServicios);

//obtener servicio
router.get('/:id', serviciosController.obtenerServicio);

//actualizar servicio
router.put('/:id', serviciosController.actualizarServicio);

//eliminar servicio
router.delete('/:id', serviciosController.eliminarServicio);

module.exports = router;