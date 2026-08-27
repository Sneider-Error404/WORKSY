import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Inicio from "./pages/inicio.jsx";
import Notificaciones from "./pages/Notificaciones.jsx";
import Perfil from "./pages/Perfil.jsx";
import Chat from "./pages/Chat.jsx";
import Postulaciones from "./pages/Postulaciones.jsx";
import CambiarCuenta from "./pages/CambiarCuenta.jsx";
import Empresa from "./pages/Empresa.jsx";
import EmpresaCreada from "./pages/EmpresaCreada.jsx";
import MiEmpresa from "./pages/MiEmpresa.jsx";
import CrearVacante from "./pages/CrearVacante.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/postulaciones" element={<Postulaciones />} />
        <Route path="/cambiar-cuenta" element={<CambiarCuenta />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/empresa-creada" element={<EmpresaCreada />} />
        <Route path="/mi-empresa" element={<MiEmpresa />} />
        <Route path="/crear-vacante" element={<CrearVacante />} />
      </Routes>
    </BrowserRouter>
  );
}
