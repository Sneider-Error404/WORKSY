const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.crearPerfilEmpresa = async (req, res) => {

    try {

        const {
            id_usuario,
            nombre_empresa,
            descripcion,
            sector,
            logo_empresa
        } = req.body;

        const empresa = await prisma.perfiles_empresa.create({

            data: {
                id_usuario,
                nombre_empresa,
                descripcion,
                sector,
                logo_empresa
            }

        });

        res.status(201).json(empresa);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al crear el perfil de empresa"
        });

    }

};

exports.obtenerPerfilEmpresa = async (req, res) => {

    try { const id = Number(req.params.id);

        const perfilEmpresa = await prisma.perfiles_empresa.findUnique({
            where: {
                id_perfil_empresa: id
            }
        });

        if (!perfilEmpresa) {
            return res.status(404).json({
                error: "Perfil de empresa no encontrado"
            });
        }

        res.json(perfilEmpresa);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener el perfil de empresa"
        });

    }

};

exports.actualizarPerfilEmpresa = async (req, res) => {

    try { const id = Number(req.params.id);

        const {
            nombre_empresa,
            descripcion,
            sector,
            logo_empresa
        } = req.body;

        const perfilEmpresa = await prisma.perfiles_empresa.update({
            where: {
                id_perfil_empresa: id
            },
            data: {
                nombre_empresa,
                descripcion,
                sector,
                logo_empresa
            }
        });

        res.json(perfilEmpresa);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al actualizar el perfil de empresa"
        });

    }

};

exports.eliminarPerfilEmpresa = async (req, res) => {

    try {

        const id = Number(req.params.id);

        await prisma.perfiles_empresa.delete({
            where: {
                id_perfil_empresa: id
            }
        });

        res.json({
            message: "Perfil de empresa eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al eliminar el perfil de empresa"
        });

    }

};