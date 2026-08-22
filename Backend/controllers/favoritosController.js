const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// crear una vacante a favoritos
exports.agregarFavorito = async (req, res) => {

    try {

        const {
            id_usuario,
            id_vacante
        } = req.body;

        const favorito = await prisma.favoritos.create({
            data: {
                id_usuario,
                id_vacante
            }
        });

        res.status(201).json(favorito);

    } catch (error) {

        console.error(error);

        if (error.code === "P2002") {
            return res.status(400).json({
                error: "La vacante ya está guardada en favoritos"
            });
        }

        res.status(500).json({
            error: "Error al agregar la vacante a favoritos"
        });

    }

};

// Obtener los favoritos de un usuario
exports.obtenerFavoritosUsuario = async (req, res) => {

    try {

        const idUsuario = Number(req.params.idUsuario);

        const favoritos = await prisma.favoritos.findMany({
            where: {
                id_usuario: idUsuario
            }
        });

        res.json(favoritos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener los favoritos"
        });

    }

};

// obtener si una vacante está guardada
exports.comprobarFavorito = async (req, res) => {

    try {

        const idUsuario = Number(req.params.idUsuario);
        const idVacante = Number(req.params.idVacante);

        const favorito = await prisma.favoritos.findFirst({
            where: {
                id_usuario: idUsuario,
                id_vacante: idVacante
            }
        });

        res.json({
            esFavorito: !!favorito
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al comprobar el favorito"
        });

    }

};

// Eliminar una vacante de favoritos
exports.eliminarFavorito = async (req, res) => {

    try {

        const id = Number(req.params.id);

        await prisma.favoritos.delete({
            where: {
                id_favorito: id
            }
        });

        res.json({
            message: "Vacante eliminada de favoritos correctamente"
        });

    } catch (error) {

        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Favorito no encontrado"
            });
        }

        res.status(500).json({
            error: "Error al eliminar el favorito"
        });

    }

};