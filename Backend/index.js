const express = require("express");
const { PrismaClient } = require("@prisma/client");


// Importar rutas
const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");


const prisma = new PrismaClient();

const app = express();

app.use(express.json());


// registrar rutas
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);


app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});