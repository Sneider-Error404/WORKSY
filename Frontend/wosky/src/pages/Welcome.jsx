import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import { FaArrowLeft } from "react-icons/fa";

import logo from "../assets/claro.png";
import vectorTop from "../assets/Vector 4.svg";
import vectorBottom from "../assets/Vector 5.svg";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = async () => {
      const token = localStorage.getItem("token");

      // Pequeña espera para que la animación se alcance a ver
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/usuarios/perfil",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          navigate("/inicio");
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }

      } catch (error) {
        console.error("Error al verificar sesión:", error);

        // Si no se puede comprobar la sesión,
        // de momento lo enviamos al login
        navigate("/login");
      }
    };

    verificarSesion();
  }, [navigate]);

  return (
    <div className="welcome">

      <button className="back">
        <FaArrowLeft />
      </button>

      <img
        src={vectorTop}
        className="vector vector-top"
        alt=""
      />

      <img
        src={vectorBottom}
        className="vector vector-bottom"
        alt=""
      />

      <div className="content">

        <img
          src={logo}
          className="logo"
          alt="Worksy"
        />

        <h2>
          Conectando talento con oportunidades
        </h2>

        <div className="dots loading-dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </div>
  );
}