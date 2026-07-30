const prisma = require("express");

const router = prisma.Router();

const vacantesController = require("../controllers/vacantesController");

// crear un perfil de empresa
router.post("/", vacantesController.crearVacante);

// obtener un perfil de empresa
router.get("/:id", vacantesController.obtenerVacante);  

// actualizar un perfil de empresa
router.put("/:id", vacantesController.actualizarVacante);

// eliminar perfil de empresa
router.delete("/:id", vacantesController.eliminarVacante);

module.exports = router;