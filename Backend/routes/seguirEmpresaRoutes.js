const express = require("express");

const router = express.Router();

const seguidoresController = require("../controllers/seguirEmpresaController");

router.post("/", seguidoresController.seguirEmpresa);

router.get(
    "/usuario/:idUsuario",seguidoresController.obtenerSeguimientosUsuario
);

router.delete(
    "/:id",seguidoresController.dejarDeSeguirEmpresa
);

module.exports = router;