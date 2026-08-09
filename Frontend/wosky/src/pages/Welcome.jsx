import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import { FaArrowLeft } from "react-icons/fa";

import logo from "../assets/claro.png";
import vectorTop from "../assets/Vector 4.svg";
import vectorBottom from "../assets/Vector 5.svg";

export default function Welcome() {
  const navigate = useNavigate();
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
        <img src={logo} className="logo" alt="Worsky" />

        <h2>Conectando talento con oportunidades</h2>

        <div className="dots">
          <span className="active"></span>
          <span></span>
          <span className="orange"></span>
          <span></span>
        </div>
        <button onClick={() => navigate("/login")} className="login-link">
          Ir al login
        </button>
      </div>
    </div>
  );
}