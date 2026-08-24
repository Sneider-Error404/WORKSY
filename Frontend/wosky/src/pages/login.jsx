import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Welcome.css";

import vectorTop from "../assets/Vector 4.svg";
import vectorBottom from "../assets/Vector 5.svg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Limpiar errores anteriores
        setError("");

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar el token recibido del backend
                localStorage.setItem("token", data.token);

                // Entrar a la página principal
                navigate("/inicio");
            } else {
                // Mostrar el error enviado por el backend
                setError(data.error || "Error al iniciar sesión.");
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error);

            setError("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div className="welcome login-page">
            <button className="back" onClick={() => navigate("/")}>
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

            <div className="content login-content">
                <h1>Inicio</h1>

                <form onSubmit={handleLogin} className="login-form">

                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                        />
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />

                        <label htmlFor="remember">
                            Recordar contraseña
                        </label>
                    </div>

                    {error && (
                        <p style={{ color: "red", fontSize: "14px" }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" className="login-form">
                        Iniciar
                    </button>

                </form>

                <p className="signup-link">
                    ¿No tienes cuenta?{" "}
                    <a
                        onClick={() => navigate("/register")}
                        style={{ cursor: "pointer" }}
                    >
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
}