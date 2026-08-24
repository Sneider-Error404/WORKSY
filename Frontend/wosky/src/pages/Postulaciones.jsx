import { useState } from "react";
import { ArrowLeft, BriefcaseBusiness, Code2, CookingPot, PersonStanding } from "lucide-react";
import { Link } from "react-router-dom";

import "./Postulaciones.css";

const applications = [
  { id: 1, title: "Programador Junior", company: "Microsoft", date: "15-06-2026", status: "Pendiente", icon: Code2 },
  { id: 2, title: "Mesero", company: "Restaurante el Sabor", date: "18-06-2026", status: "Aceptada", icon: CookingPot },
  { id: 3, title: "Soporte tecnico", company: "Tech soluciones", date: "01-05-2026", status: "Rechazado", icon: BriefcaseBusiness },
  { id: 4, title: "Limpieza", company: "Hospital Carlos Centeno", date: "10-04-2026", status: "Pendiente", icon: PersonStanding },
];

const filters = ["Todas", "Aceptadas", "Pendientes", "Rechazadas"];
const statusByFilter = { Aceptadas: "aceptada", Pendientes: "pendiente", Rechazadas: "rechazado" };

export default function Postulaciones() {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const filteredApplications = applications.filter((application) => (
    activeFilter === "Todas" || application.status.toLowerCase() === statusByFilter[activeFilter]
  ));

  return (
    <main className="postulaciones-page">
      <div className="applications-shape applications-shape-top" />
      <div className="applications-shape applications-shape-bottom" />

      <header className="applications-header">
        <Link to="/perfil" className="applications-back" aria-label="Volver al perfil"><ArrowLeft size={28} /></Link>
      </header>

      <section className="applications-panel" aria-labelledby="applications-title">
        <h1 id="applications-title" className="sr-only">Mis postulaciones</h1>
        <nav className="application-filters" aria-label="Filtrar postulaciones">
          {filters.map((filter) => (
            <button key={filter} type="button" className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </nav>

        <div className="application-list">
          {filteredApplications.length > 0 ? filteredApplications.map(({ id, title, company, date, status, icon: Icon }) => (
            <article className="application-card" key={id}>
              <div className={`application-icon status-icon-${id}`}><Icon size={39} strokeWidth={1.7} /></div>
              <div className="application-info">
                <h2>{title}</h2>
                <p>{company}</p>
                <time>Postulado&nbsp; {date}</time>
              </div>
              <span className={`application-status ${status.toLowerCase()}`}>{status}</span>
            </article>
          )) : <p className="no-applications">No hay postulaciones en esta categoría.</p>}
        </div>
      </section>
    </main>
  );
}