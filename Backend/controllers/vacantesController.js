const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// Crear una vacante
exports.crearVacante = async (req, res) => {
    try {
        const {
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

        const perfilEmpresa = await prisma.perfiles_empresa.findUnique({
            where: {
                id_usuario: req.usuario.id_usuario
            }
        });

        if (!perfilEmpresa) {
            return res.status(403).json({
                error: "Debes tener un perfil de empresa para crear vacantes."
            });
        }

        const vacante = await prisma.vacantes.create({
            data: {
                id_perfil_empresa: perfilEmpresa.id_perfil_empresa,
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


// Obtener todas las vacantes activas
exports.obtenerVacantes = async (req, res) => {
    try {
        const vacantes = await prisma.vacantes.findMany({
            where: {
                estado: "activa"
            },

            include: {
                perfiles_empresa: {
                    select: {
                        nombre_empresa: true,
                        logo_empresa: true
                    }
                },

                categorias: {
                    select: {
                        nombre_categoria: true
                    }
                },

                municipios: {
                    select: {
                        nombre_municipio: true
                    }
                }
            },

            orderBy: {
                fecha_publicacion: "desc"
            }
        });

        res.status(200).json(vacantes);

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

        const filtros = {
            estado: "activa"
        };

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

        const vacantes = await prisma.vacantes.findMany({
            where: filtros,

            include: {
                perfiles_empresa: {
                    select: {
                        nombre_empresa: true,
                        logo_empresa: true
                    }
                },

                categorias: {
                    select: {
                        nombre_categoria: true
                    }
                },

                municipios: {
                    select: {
                        nombre_municipio: true
                    }
                }
            },

            orderBy: {
                fecha_publicacion: "desc"
            }
        });

        if (vacantes.length === 0) {
            return res.status(200).json({
                mensaje: "No se encontraron vacantes que coincidan con la búsqueda",
                vacantes: []
            });
        }

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


// Obtener una vacante por ID
exports.obtenerVacante = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const vacante = await prisma.vacantes.findUnique({
            where: {
                id_vacante: id
            },

            include: {
                perfiles_empresa: {
                    select: {
                        nombre_empresa: true,
                        logo_empresa: true
                    }
                },

                categorias: {
                    select: {
                        nombre_categoria: true
                    }
                },

                municipios: {
                    select: {
                        nombre_municipio: true
                    }
                }
            }
        });

        if (!vacante) {
            return res.status(404).json({
                error: "Vacante no encontrada"
            });
        }

        res.status(200).json(vacante);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener la vacante"
        });
    }
};


// Obtener las vacantes de mi empresa
exports.obtenerMisVacantes = async (req, res) => {
    try {
        const perfilEmpresa = await prisma.perfiles_empresa.findUnique({
            where: {
                id_usuario: req.usuario.id_usuario
            }
        });

        if (!perfilEmpresa) {
            return res.status(403).json({
                error: "Debes tener un perfil de empresa para consultar tus vacantes."
            });
        }

        const vacantes = await prisma.vacantes.findMany({
            where: {
                id_perfil_empresa: perfilEmpresa.id_perfil_empresa
            },

            include: {
                categorias: {
                    select: {
                        nombre_categoria: true
                    }
                },

                municipios: {
                    select: {
                        nombre_municipio: true
                    }
                }
            },

            orderBy: {
                fecha_publicacion: "desc"
            }
        });

        res.status(200).json(vacantes);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener las vacantes de la empresa"
        });
    }
};


// Actualizar una vacante
exports.actualizarVacante = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const perfilEmpresa = await prisma.perfiles_empresa.findUnique({
            where: {
                id_usuario: req.usuario.id_usuario
            }
        });

        if (!perfilEmpresa) {
            return res.status(403).json({
                error: "Debes tener un perfil de empresa para actualizar vacantes."
            });
        }

        const vacanteExistente = await prisma.vacantes.findUnique({
            where: {
                id_vacante: id
            }
        });

        if (!vacanteExistente) {
            return res.status(404).json({
                error: "Vacante no encontrada."
            });
        }

        if (
            vacanteExistente.id_perfil_empresa !==
            perfilEmpresa.id_perfil_empresa
        ) {
            return res.status(403).json({
                error: "No tienes permiso para modificar esta vacante."
            });
        }

        const {
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

        res.status(200).json(vacante);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al actualizar la vacante"
        });
    }
};


// Eliminar una vacante
exports.eliminarVacante = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const perfilEmpresa = await prisma.perfiles_empresa.findUnique({
            where: {
                id_usuario: req.usuario.id_usuario
            }
        });

        if (!perfilEmpresa) {
            return res.status(403).json({
                error: "Debes tener un perfil de empresa para eliminar vacantes."
            });
        }

        const vacanteExistente = await prisma.vacantes.findUnique({
            where: {
                id_vacante: id
            }
        });

        if (!vacanteExistente) {
            return res.status(404).json({
                error: "Vacante no encontrada."
            });
        }

        if (
            vacanteExistente.id_perfil_empresa !==
            perfilEmpresa.id_perfil_empresa
        ) {
            return res.status(403).json({
                error: "No tienes permiso para eliminar esta vacante."
            });
        }

        await prisma.vacantes.delete({
            where: {
                id_vacante: id
            }
        });

        res.status(200).json({
            message: "Vacante eliminada correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al eliminar la vacante"
        });
    }
};