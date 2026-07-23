const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.test = (req, res) => {
    res.json({
        mensaje: "El controlador de autenticación funciona correctamente."
    });
};

exports.register = async (req, res) => {

    try {

        const {
            tipoCuenta,
            nombre,
            apellido,
            correo,
            password,
            confirmPassword
        } = req.body;

        if (
            !tipoCuenta ||
            !nombre ||
            !correo ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).json({
                error: "Debe completar todos los campos obligatorios."
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Las contraseñas no coinciden."
            });
        }

        const usuarioExistente = await prisma.usuarios.findUnique({
            where: {
                correo: correo
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({
                error: "Ya existe una cuenta registrada con ese correo."
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = await prisma.usuarios.create({
            data: {
                nombre: nombre,
                apellido: apellido || null,
                correo: correo,
                contrase_a: passwordHash
            }
        });

        return res.status(201).json({
            mensaje: "Usuario registrado correctamente.",
            usuario: {
                id_usuario: nuevoUsuario.id_usuario,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Ocurrió un error al registrar el usuario."
        });

    }

};

exports.login = async (req, res) => {

    try {

        
const {
    correo,
    password
} = req.body;

if (!correo || !password) {
    return res.status(400).json({
        error: "Debe ingresar el correo y la contraseña."
    });
}

const usuario = await prisma.usuarios.findUnique({
    where: {
        correo: correo
    }
});

if (!usuario) {
    return res.status(404).json({
        error: "No existe una cuenta con ese correo."
    });
}

const passwordCorrecta = await bcrypt.compare(
    password,
    usuario.contrase_a
);

if (!passwordCorrecta) {
    return res.status(401).json({
        error: "Contraseña incorrecta."
    });
}

return res.status(200).json({
    mensaje: "Inicio de sesión exitoso.",
    usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo
    }
});

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Ocurrió un error al iniciar sesión."
        });

    }

};