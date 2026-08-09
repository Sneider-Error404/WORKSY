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
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login:", email, password, rememberMe);
        // Aquí va la lógica de login
        navigate("/inicio");
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
                        <label htmlFor="remember">Recordar contraseña</label>
                    </div>

                    <button type="submit" className="login-form">
                        Iniciar
                    </button>
                </form>

                <p className="signup-link">
                    ¿No tienes cuenta? <a onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>Regístrate</a>
                </p>
            </div>
        </div>
    );
}