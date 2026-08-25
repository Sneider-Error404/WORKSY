import { ArrowLeft, Building2, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import "./CambiarCuenta.css";
import accountDecoration from "../assets/arcticons_star-tv.png";

export default function CambiarCuenta() {
  const navigate = useNavigate();

  return (
    <main className="change-account-page">
      <img className="change-account-decoration" src={accountDecoration} alt="" aria-hidden="true" />
      <header className="change-account-header">
        <Link to="/perfil" className="change-account-back" aria-label="Volver al perfil">
          <ArrowLeft size={26} />
        </Link>
      </header>

      <section className="change-account-content" aria-labelledby="change-account-title">
        <p className="change-account-intro" id="change-account-title">
          Puedes cambiar tu tipo de cuenta cuando lo necesites. Esto no eliminará tu información.
        </p>
        <br />
        <br />
      
        <button className="account-option account-option-selected" type="button" aria-pressed="true">
          <Building2 className="account-option-icon" size={64} strokeWidth={1.8} />
          <span className="account-option-copy">
            <strong>Empresa</strong>
            <span>Publico vacantes y busco talento</span>
          </span>
        </button>
        <br />
        
        
        <div className="account-info">
          <Info size={54} strokeWidth={2.2} />
          <p>Al cambiar a una cuenta de empresa, podrás crear el perfil de tu empresa y publicar vacantes.</p>
        </div>

        <button className="change-account-continue" type="button" onClick={() => navigate("/empresa")}>
          Continuar
        </button>
      </section>
    </main>
  );
}
