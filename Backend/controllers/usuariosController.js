const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.obtenerUsuario = async (req, res) => {
    try {
        const id = req.usuario.id_usuario;

        const usuario = await prisma.usuarios.findUnique({
            where: {
                id_usuario: id
            },
            select: {
                id_usuario: true,
                nombre: true,
                apellido: true,
                correo: true,
                telefono: true,
                universidad: true,
                carrera: true,
                descripcion_personal: true,
                disponibilidad_laboral: true,
                foto_perfil: true,
                primer_empleo: true,
                fecha_registro: true
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

        const id = req.usuario.id_usuario;

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
    },

    select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        correo: true,
        telefono: true,
        universidad: true,
        carrera: true,
        descripcion_personal: true,
        disponibilidad_laboral: true,
        foto_perfil: true,
        primer_empleo: true,
        fecha_registro: true
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