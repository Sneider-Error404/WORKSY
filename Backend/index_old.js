const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        contrase_a: req.body.contraseña,
        telefono: req.body.telefono,
        universidad: req.body.universidad,
        carrera: req.body.carrera,
        descripcion_personal: req.body.descripcion_personal,
        experiencia: req.body.experiencia,
        disponibilidad_laboral: req.body.disponibilidad_laboral,
      },
    });

    res.json(nuevoUsuario);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

app.post("/empresas", async (req, res) => {
  try {
    const nuevaEmpresa = await prisma.empresas.create({
      data: {
        nombre_empresa: req.body.nombre_empresa,
        correo: req.body.correo,
        contrase_a: req.body.contraseña,
        telefono: req.body.telefono,
        descripcion: req.body.descripcion,
        sector: req.body.sector,
        ubicacion: req.body.ubicacion,
      },
    });

    res.json(nuevaEmpresa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear empresa" });
  }
});

app.get("/empresas", async (req, res) => {
  try {
    const empresas = await prisma.empresas.findMany();
    res.json(empresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener empresas" });
  }
});

app.post("/vacantes", async (req, res) => {
  try {
    const nuevaVacante = await prisma.vacantes.create({
      data: {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        requisitos: req.body.requisitos,
        salario: req.body.salario,
        modalidad: req.body.modalidad,
        ubicacion: req.body.ubicacion,
        id_empresa: req.body.id_empresa,
      },
    });

    res.json(nuevaVacante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear vacante" });
  }
});

app.get("/vacantes", async (req, res) => {
  try {
    const vacantes = await prisma.vacantes.findMany({
  include: {
    empresas: true,
  },
});
    res.json(vacantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener vacantes" });
  }
});

app.post("/postulaciones", async (req, res) => {
  try {
    const postulacionExistente = await prisma.postulaciones.findFirst({
      where: {
        id_usuario: req.body.id_usuario,
        id_vacante: req.body.id_vacante,
      },
    });

    if (postulacionExistente) {
      return res.status(400).json({
        error: "Este usuario ya aplicó a esta vacante",
      });
    }

    const nuevaPostulacion = await prisma.postulaciones.create({
      data: {
        id_usuario: req.body.id_usuario,
        id_vacante: req.body.id_vacante,
        estado: "pendiente",
      },
    });

    res.json(nuevaPostulacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear postulación" });
  }
});

app.get("/postulaciones", async (req, res) => {
  try {
    const postulaciones = await prisma.postulaciones.findMany({
      include: {
        usuarios: true,
        vacantes: {
          include: {
            empresas: true,
          },
        },
      },
    });

    res.json(postulaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener postulaciones" });
  }
});

app.post("/habilidades", async (req, res) => {
  try {
    const nuevaHabilidad = await prisma.habilidades.create({
      data: {
        nombre_habilidad: req.body.nombre_habilidad,
      },
    });

    res.json(nuevaHabilidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear habilidad" });
  }
});

app.get("/habilidades", async (req, res) => {
  try {
    const habilidades = await prisma.habilidades.findMany();
    res.json(habilidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener habilidades" });
  }
});

app.post("/usuarios-habilidades", async (req, res) => {
  try {
    const nuevaRelacion = await prisma.usuario_habilidades.create({
      data: {
        id_usuario: req.body.id_usuario,
        id_habilidad: req.body.id_habilidad,
      },
    });

    res.json(nuevaRelacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al relacionar usuario con habilidad" });
  }
});

app.get("/usuarios-habilidades", async (req, res) => {
  try {
    const relaciones = await prisma.usuario_habilidades.findMany({
      include: {
        usuarios: true,
        habilidades: true,
      },
    });

    res.json(relaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener relaciones" });
  }
});

app.post("/login/usuario", async (req, res) => {
  try {
    const usuario = await prisma.usuarios.findUnique({
      where: {
        correo: req.body.correo,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (usuario.contrase_a !== req.body.contraseña) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      mensaje: "Login exitoso",
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

app.post("/login/empresa", async (req, res) => {
  try {
    const empresa = await prisma.empresas.findUnique({
      where: {
        correo: req.body.correo,
      },
    });

    if (!empresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }

    if (empresa.contrase_a !== req.body.contraseña) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      mensaje: "Login exitoso",
      empresa: {
        id_empresa: empresa.id_empresa,
        nombre_empresa: empresa.nombre_empresa,
        correo: empresa.correo,
        sector: empresa.sector,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});