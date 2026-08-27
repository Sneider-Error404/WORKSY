import { ArrowLeft, ChevronRight, Plus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./MiEmpresa.css";

const vacancies = [
  { title: "Desarrollador web", location: "Managua . Remoto", logo: "microsoft" },
  { title: "Diseñador", location: "Leon . Híbrido", logo: "colorful" },
];

function CompanyLogo({ variant = "microsoft", small = false }) {
  return (
    <div className={`company-logo ${small ? "company-logo-small" : ""} company-logo-${variant}`} aria-hidden="true">
      {variant === "microsoft" ? <><i /><i /><i /><i /></> : <span>✣</span>}
    </div>
  );
}

export default function MiEmpresa() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const companyName = state?.companyName || "Microsoft";
  const logoPreview = state?.logoPreview;

  return (
    <main className="my-company-page">
      <header className="my-company-header">
        <Link to="/empresa-creada" className="my-company-back" aria-label="Volver">
          <ArrowLeft size={25} />
        </Link>
        <button className="create-vacancy-button" type="button" onClick={() => navigate("/crear-vacante")}>
          <Plus size={17} /> Crear vacante
        </button>
      </header>

      <section className="my-company-panel" aria-labelledby="my-company-title">
        <div className="my-company-summary">
          {logoPreview ? <img className="company-logo uploaded-company-logo" src={logoPreview} alt="Logo de la empresa" /> : <CompanyLogo />}
          <div className="my-company-identity">
            <h1 id="my-company-title">{companyName}</h1>
            <p>Empresa de Software</p>
          </div>
          <span className="verified-company">Verificado</span>
        </div>

        <div className="company-stats">
          <span><strong>120</strong>Seguidores</span>
          <span><strong>15</strong>Vacantes</span>
          <span><strong>98%</strong>Calificación</span>
        </div>

        <div className="about-company">
          <h2>Sobre la empresa</h2>
          <p>Somos una empresa dedicada al desarrollo de soluciones tecnicas innovadoras. Buscamo talento apasionado por la tecnología y la innovación</p>
          <button type="button">Ver más...</button>
        </div>

        <div className="published-vacancies">
          <div className="vacancies-heading"><span>Vacantes publicadas</span><button type="button">Ver todos...</button></div>
          {vacancies.map((vacancy) => (
            <button className="company-vacancy" key={vacancy.title} type="button">
              <CompanyLogo variant={vacancy.logo} small />
              <span><strong>{vacancy.title}</strong><small>{vacancy.location}</small></span>
              <ChevronRight size={19} />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
