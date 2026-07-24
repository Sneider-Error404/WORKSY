const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.crearVacante = async (req, res) => {

    try{
        
        const {
            id_perfil_empresa,
            titulo,
            descripcion,
            salario,
            modalidad,
            tipo_empleo,
            requiere_experiencia,
            acepta_primer_empleo,
            id_categoria,
            id_municipio
        } = req.body;

        const vacante = await prisma.vacantes.create({
            data: {
                id_perfil_empresa,
                titulo,
                descripcion,
                salario,
                modalidad,
                tipo_empleo,
                requiere_experiencia,
                acepta_primer_empleo,
                id_categoria,
                id_municipio
            }
        });

        res.status(201).json(vacante);

    } catch (error) {

    console.error(error);

    res.status(500).json({
        error: "Error al crear la vacante"
    });

    }
};

exports.obtenerVacante = async (req, res) => {

    const id = Number(req.params.id);

    try { const vacante = await prisma.vacantes.findUnique({
        where: {
            id_vacante: id
        }
    });

    if (!vacante) {
        return res.status(404).json({
            error: "Vacante no encontrada"
        });
    }

        res.json(vacante);

    } catch (error) {
         res.status(500).json({error: "Error al obtener la vacante"});
    }
};

exports.actualizarVacante = async (req, res) => {
    const id = Number(req.params.id);

    try {
       const {
            id_perfil_empresa,
            titulo,
            descripcion,
            salario,
            modalidad,
            tipo_empleo,
            requiere_experiencia,
            acepta_primer_empleo,
            id_categoria,
            id_municipio
        } = req.body;

        const vacante = await prisma.vacantes.update({
            where: {
                id_vacante: id
            },
            data: {
                id_perfil_empresa,
                titulo,
                descripcion,
                salario,
                modalidad,
                tipo_empleo,
                requiere_experiencia,
                acepta_primer_empleo,
                id_categoria,
                id_municipio
            }
        });

        res.json(vacante);

    } catch (error) {

        console.error(error);

        res.status(500).json({error: "Error al actualizar la vacante"});
    }
};

exports.eliminarVacante = async (req, res) => {
    
    const id = Number(req.params.id);

    try {
        
        await prisma.vacantes.delete({
        where: {
            id_vacante: id
        }
        
    });

    res.json({ message: "Vacante eliminada correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al eliminar la vacante"});
    }
};