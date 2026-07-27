const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


exports.crearServicio = async (req, res) => {

    try {

        const {
            id_usuario,
            titulo,
            descripcion,
            id_categoria,
            id_municipio
        } = req.body;

        const servicio = await prisma.servicios.create({
            data: {
                id_usuario,
                titulo,
                descripcion,
                id_categoria,
                id_municipio
            }
        });

        res.status(201).json(servicio);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al crear el servicio"
        });

    }

};


// Obtener todos los servicios
exports.obtenerServicios = async (req, res) => {

    try {

        const servicios = await prisma.servicios.findMany();

        res.json(servicios);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener los servicios"
        });

    }

};


exports.obtenerServicio = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const servicio = await prisma.servicios.findUnique({
            where: {
                id_servicio: id
            }
        });

        if (!servicio) {
            return res.status(404).json({
                error: "Servicio no encontrado"
            });
        }

        res.json(servicio);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener el servicio"
        });

    }

};


exports.actualizarServicio = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const {
            titulo,
            descripcion,
            id_categoria,
            id_municipio
        } = req.body;

        const servicio = await prisma.servicios.update({
            where: {
                id_servicio: id
            },
            data: {
                titulo,
                descripcion,
                id_categoria,
                id_municipio
            }
        });

        res.json(servicio);

    } catch (error) {

        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Servicio no encontrado"
            });
        }

        res.status(500).json({
            error: "Error al actualizar el servicio"
        });

    }

};


exports.eliminarServicio = async (req, res) => {

    try {

        const id = Number(req.params.id);

        await prisma.servicios.delete({
            where: {
                id_servicio: id
            }
        });

        res.json({
            message: "Servicio eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Servicio no encontrado"
            });
        }

        res.status(500).json({
            error: "Error al eliminar el servicio"
        });

    }

};