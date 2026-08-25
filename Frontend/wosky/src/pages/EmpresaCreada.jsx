import { ArrowLeft, Check } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";


import "./EmpresaCreada.css";

export default function EmpresaCreada() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const companyName = state?.companyName || "Microsoft";
  const logoPreview = state?.logoPreview;

  return (
    <main className="company-created-page">

      <header className="company-created-header">
        <Link to="/empresa" className="company-created-back" aria-label="Volver a información de empresa">
          <ArrowLeft size={26} />
        </Link>
      </header>

      <section className="company-created-panel" aria-labelledby="created-title">
        <div className="success-mark" aria-hidden="true">
          <Check size={54} strokeWidth={1.5} />
        </div>
        <p className="success-title" id="created-title">¡Listo!</p>
        <p className="success-subtitle">Tu cuenta ahora es de tipo Empresa</p>

        <div className="created-company-card">
          <div className="created-company-logo">
            {logoPreview ? <img src={logoPreview} alt="" /> : <span>MS</span>}
          </div>
          <div>
            <strong>{companyName}</strong>
            <p>Tu perfil de empresa ha sido<br />creado exitosamente</p>
          </div>
        </div>

        <button className="go-company-button" type="button" onClick={() => navigate("/mi-empresa", { state: { companyName, logoPreview } })}>
          Ir a mi Empresa
        </button>
      </section>
    </main>
  );
}
