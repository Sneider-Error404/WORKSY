const {PrismaClient}= require("@prisma/client");

const prisma = new PrismaClient();

exports.crearPostulacion = async (req, res) => {
    
        try {

        const {
            id_usuario,
            id_vacante
        } = req.body;

        const postulacion = await prisma.postulaciones.create({
            data: {
                id_usuario,
                id_vacante
            }
        });

        res.status(201).json(postulacion);

        } catch (error) {
        console.error(error);

            res.status(500).json({
                error: "Error al crear la postulacion"
            });
        }

}



exports.obtenerPostulacion = async (req, res) => {

    const id = Number(req.params.id);

    try { const postulacion = await prisma.postulaciones.findUnique({
        where: {
            id_postulacion: id
        }
    });

    if (!postulacion) {
        return res.status(404).json({
            error: "Postulación no encontrada"
        });
        }

        res.json(postulacion);

    }

    catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al obtener la postulación"});
    }

};

exports.actualizarPostulacion = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const { estado } = req.body;

        const postulacion = await prisma.postulaciones.update({

            where: {
                id_postulacion: id
            },

            data: {
                estado
            }

        });

        res.json(postulacion);

    } catch (error) {

        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Postulación no encontrada"
            });
        }

        res.status(500).json({
            error: "Error al actualizar la postulación"
        });

    }

};

exports.eliminarPostulacion = async (req, res) => {

    try {

        const id = Number(req.params.id);

        await prisma.postulaciones.delete({

            where: {
                id_postulacion: id
            }

        });

        res.json({
            message: "Postulación eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al eliminar la postulación"
        });

    }

};