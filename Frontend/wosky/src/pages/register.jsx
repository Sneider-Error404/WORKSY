import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Welcome.css";

import vectorTop from "../assets/Vector 4.svg";
import vectorBottom from "../assets/Vector 5.svg";

export default function Register() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: name,
                apellido: lastName,
                correo: email,
                password: password,
                confirmPassword: confirmPassword
            })
        });

        const data = await response.json();

if (response.ok) {
    navigate("/login");
} else {
    console.log(data);
}

    } catch (error) {
        console.error("Error al registrar usuario:", error);
    }
};

    return (
        <div className="welcome login-page">
            <button
                className="back"
                onClick={() => navigate("/login")}
            >
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
                <h1>Regístrate</h1>

                <form
                    onSubmit={handleRegister}
                    className="login-form"
                >
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Esther"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Apellido</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Martinez"
                        />
                    </div>

                    <div className="form-group">
                        <label>Correo</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="@gmail.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-form"
                    >
                        Registrarse
                    </button>
                </form>

                <p className="signup-link">
                    ¿Ya tienes cuenta?{" "}
                    <a
                        onClick={() => navigate("/login")}
                        style={{ cursor: "pointer" }}
                    >
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    );
}