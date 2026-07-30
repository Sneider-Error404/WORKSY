const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.obtenerUsuario = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const usuario = await prisma.usuarios.findUnique({

            where: {
                id_usuario: id
            }

        });

        if (!usuario) {

            return res.status(404).json({
                error: "Usuario no encontrado"
            });

        }

        res.json(usuario);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener el usuario"
        });

    }

};

exports.actualizarUsuario = async (req, res) => {

    try { 

        const id = Number(req.params.id);

        const { nombre,apellido, telefono,universidad,carrera,descripcion_personal,
             disponibilidad_laboral,foto_perfil,primer_empleo} = req.body;

        const usuario = await prisma.usuarios.update({

            where: {
                id_usuario: id
            },

            data: {
                nombre,
                apellido,
                telefono,
                universidad,
                carrera,
                descripcion_personal,
                disponibilidad_laboral,
                foto_perfil,
                primer_empleo,
                 
            }

        });

        res.json(usuario);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al actualizar el usuario"
        });

    }

};

exports.eliminarUsuario = async (req, res) => {

    try {

        const id = Number(req.params.id);

        await prisma.usuarios.delete({
            where: {
                id_usuario: id
            }
        });

        res.json({ message: "Usuario eliminado correctamente" });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al eliminar el usuario"
        });

    }

};