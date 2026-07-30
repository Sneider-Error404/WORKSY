import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Inicio from "./pages/inicio.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}
