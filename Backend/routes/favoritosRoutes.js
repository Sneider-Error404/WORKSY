const express = require("express");

const router = express.Router();

const favoritosController = require("../controllers/favoritosController");

// crear una vacante a favoritos
router.post("/", favoritosController.agregarFavorito);

// Obtener los favoritos de un usuario
router.get(
    "/usuario/:idUsuario",
    favoritosController.obtenerFavoritosUsuario
);

// obtener si una vacante está guardada
router.get(
    "/usuario/:idUsuario/vacante/:idVacante",
    favoritosController.comprobarFavorito
);

// Eliminar una vacante de favoritos
router.delete("/:id", favoritosController.eliminarFavorito);

module.exports = router;