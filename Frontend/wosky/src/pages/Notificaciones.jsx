import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, ThumbsUp, MessageSquare, UserPlus } from "lucide-react";
import "./Notificaciones.css";
import logo from "../assets/claro.png";

const notifications = [
  {
    id: 1,
    type: "vacante",
    title: "Nuevo vacante publicado",
    subtitle: "Desarrollador Web en empresa ABC",
    time: "Hace 3 hora",
    body: "Se ha publicado una nueva vacante para Desarrollador Web en la empresa ABC. Requisitos: React, Node.js, 2 años de experiencia. Haz clic para ver más detalles y postularte.",
  },
  {
    id: 2,
    type: "favorito",
    title: "Tu servicio fue guardado como favorito",
    subtitle: "",
    time: "Hace 2 dias",
    body: "Has guardado el servicio de Diseño Gráfico como favorito. Puedes verlo en tu lista de favoritos y contactarlo cuando lo necesites.",
  },
  {
    id: 3,
    type: "mensaje",
    title: "Tienes un nuevo mensaje de",
    subtitle: "Empresa XYZ",
    time: "Hace 5 dias",
    body: "Empresa XYZ te ha enviado un mensaje: \"Hola, nos interesa tu perfil, ¿puedes enviar tu CV actualizado?\". Responde para continuar la conversación.",
  },
  {
    id: 4,
    type: "recomendacion",
    title: "Nuevas recomendaciones",
    subtitle: "para ti",
    time: "Ayer",
    body: "Hemos encontrado nuevas recomendaciones de servicios que podrían interesarte según tu actividad reciente.",
  },
  {
    id: 5,
    type: "seguidores",
    title: "Nuevos seguidores",
    subtitle: "tienes 6 nuevos seguidores",
    time: "Hace 2 semanas",
    body: "Has ganado 6 nuevos seguidores. Ve su perfil y agradece sus recomendaciones para mejorar tu red.",
  },
];

function iconFor(type) {
  switch (type) {
    case "vacante":
      return <Briefcase size={24} />;
    case "favorito":
      return <ThumbsUp size={24} />;
    case "mensaje":
      return <MessageSquare size={24} />;
    case "recomendacion":
      return <ThumbsUp size={24} />;
    case "seguidores":
      return <UserPlus size={24} />;
    default:
      return <Briefcase size={24} />;
  }
}

export default function Notificaciones() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };
  // Agrupar notificaciones por tipo
  const typeLabels = {
    vacante: "Vacantes",
    favorito: "Favoritos",
    mensaje: "Mensajes",
    recomendacion: "Recomendaciones",
    seguidores: "Seguidores",
  };

  const grouped = notifications.reduce((acc, n) => {
    (acc[n.type] = acc[n.type] || []).push(n);
    return acc;
  }, {});

  return (
    <div className="notifs-page">
      <header className="notifs-header">
        <Link to="/inicio" className="back-btn" aria-label="Volver">
          <ArrowLeft size={20} />
        </Link>

        <div className="logo-wrap">
          <img src={logo} alt="Worksy" />
        </div>
      </header>

      <main className="notifs-main">
        <div className="panel">
          <div className="notifs-card">
            {Object.entries(grouped).map(([type, items]) => (
              <section key={type} className={`notif-section ${type}`}>
                <div className="section-title-wrap">
                  <h3 className="section-title">{typeLabels[type] || type}</h3>
                  <div className="section-count">{items.length}</div>
                </div>

                <div className="section-list">
                  {items.map((n) => {
                    const isExpanded = expandedId === n.id;

                    return (
                      <div key={n.id}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleExpand(n.id)}
                          onKeyDown={(e) => e.key === "Enter" && toggleExpand(n.id)}
                          className={`notif-row ${n.type} ${isExpanded ? "expanded" : ""}`}
                        >
                          <div className="notif-icon">{iconFor(n.type)}</div>

                          <div className="notif-content">
                            <div className="notif-title">{n.title}</div>
                            {n.subtitle && <div className="notif-sub">{n.subtitle}</div>}
                          </div>

                          <div className="notif-time">{n.time}</div>
                        </div>

                        {isExpanded && (
                          <div className="expanded-content">
                            <p>{n.body}</p>
                            <div className="expanded-actions">
                              <button className="btn primary">Ver detalles</button>
                              <button className="btn">Marcar leído</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
