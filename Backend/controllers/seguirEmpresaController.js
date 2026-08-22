const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


exports.seguirEmpresa = async (req, res) => {

    try {

        const {
            id_usuario,
            id_perfil_empresa
        } = req.body;

        const seguimiento = await prisma.seguidores_empresa.create({
            data: {
                id_usuario,
                id_perfil_empresa
            }
        });

        res.status(201).json(seguimiento);

    } catch (error) {

        console.error(error);

        if (error.code === "P2002") {
            return res.status(400).json({
                error: "El usuario ya sigue esta empresa"
            });
        }

        res.status(500).json({
            error: "Error al seguir la empresa"
        });

    }

};


exports.obtenerSeguimientosUsuario = async (req, res) => {

    try {

        const idUsuario = Number(req.params.idUsuario);

        const seguimientos = await prisma.seguidores_empresa.findMany({
            where: {
                id_usuario: idUsuario
            }
        });

        res.json(seguimientos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener las empresas seguidas"
        });

    }

};


exports.dejarDeSeguirEmpresa = async (req, res) => {

    try {

        const id = Number(req.params.id);

        await prisma.seguidores_empresa.delete({
            where: {
                id_seguimiento: id
            }
        });

        res.json({
            message: "Se dejó de seguir la empresa correctamente"
        });

    } catch (error) {

        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Seguimiento no encontrado"
            });
        }

        res.status(500).json({
            error: "Error al dejar de seguir la empresa"
        });

    }

};