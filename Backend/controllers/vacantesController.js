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

// Obtener todas las vacantes
exports.obtenerVacantes = async (req, res) => {

    try {

        const vacantes = await prisma.vacantes.findMany();

        res.json(vacantes);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener las vacantes"
        });

    }

};


// Buscar vacantes por texto y filtros
exports.buscarVacantes = async (req, res) => {

    try {

        const {
            texto,
            categoria,
            municipio,
            modalidad,
            tipoEmpleo,
            primerEmpleo,
            requiereExperiencia
        } = req.query;

        const filtros = {};

        console.log("ENTRÓ A BUSCAR VACANTES");
        console.log("Query recibida:", req.query);

        if (texto) {
            filtros.OR = [
                {
                    titulo: {
                        contains: texto
                    }
                },
                {
                    descripcion: {
                        contains: texto
                    }
                }
            ];
        }

        if (categoria) {
            filtros.id_categoria = Number(categoria);
        }

        if (municipio) {
            filtros.id_municipio = Number(municipio);
        }

        if (modalidad) {
            filtros.modalidad = modalidad;
        }

        if (tipoEmpleo) {
            filtros.tipo_empleo = tipoEmpleo;
        }

        if (primerEmpleo !== undefined) {
            filtros.acepta_primer_empleo =
                primerEmpleo === "true";
        }

        if (requiereExperiencia !== undefined) {
            filtros.requiere_experiencia =
                requiereExperiencia === "true";
        }

        console.log("Filtros enviados a Prisma:", filtros);

        const vacantes = await prisma.vacantes.findMany({
            where: filtros,
            orderBy: {
                fecha_publicacion: "desc"
            }
        });

                // Verificar si no se encontraron vacantes
            if (vacantes.length === 0) {
                return res.status(200).json({
                    mensaje: "No se encontraron vacantes que coincidan con la búsqueda",
                    vacantes: []
                });
            }

            // Si se encontraron vacantes
            res.status(200).json({
                mensaje: "Vacantes encontradas",
                vacantes: vacantes
});

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al buscar vacantes"
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