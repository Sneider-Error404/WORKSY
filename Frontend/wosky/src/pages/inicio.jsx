import { useState } from "react";
import {
  Stethoscope,
  Zap,
  BriefcaseBusiness,
  ChefHat,
  Palette,
  Code2,
  Heart,
  Menu,
  Bell,
  Search,
  House,
  MessageCircleMore,
  Plus,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Welcome.css";

import logo from "../assets/claro.png";
import xyz from "../assets/xyz.png";

export default function Inicio() {
  const [searchQuery, setSearchQuery] = useState("");
  const [likedItems, setLikedItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { icon: <Stethoscope size={34} strokeWidth={2} />, label: "Doctor", value: "doctor" },
    { icon: <Zap size={34} strokeWidth={2} />, label: "Electricistas", value: "electricistas" },
    {
      icon: <BriefcaseBusiness size={34} strokeWidth={2} />,
      label: "Gerentes",
      value: "gerentes",
    },
    { icon: <ChefHat size={34} strokeWidth={2} />, label: "Cocineros", value: "cocineros" },
    { icon: <Palette size={34} strokeWidth={2} />, label: "Diseñador", value: "diseñador" },
    { icon: <Code2 size={34} strokeWidth={2} />, label: "Programador", value: "programador" },
    { icon: <Heart size={34} strokeWidth={2} />, label: "Más", value: "all" },
  ];

  const vacantes = [
    {
      id: 1,
      title: "Doctor General",
      company: "Clínica San José",
      location: "Nicaragua",
      badge1: "Tiempo completo",
      salary: "C$ 4,500",
      timePosted: "Hace 1 hora",
      logo: xyz,
      category: "doctor",
    },
    {
      id: 2,
      title: "Electricista Industrial",
      company: "ElectroSol",
      location: "Nicaragua",
      badge1: "Tiempo completo",
      salary: "C$ 3,500",
      timePosted: "Hace 3 horas",
      logo: xyz,
      category: "electricistas",
    },
    {
      id: 3,
      title: "Gerente de Proyecto",
      company: "Constructora X",
      location: "Nicaragua",
      badge1: "Tiempo completo",
      salary: "C$ 6,200",
      timePosted: "Hace 5 horas",
      logo: xyz,
      category: "gerentes",
    },
    {
      id: 4,
      title: "Cocinero Profesional",
      company: "Restaurante Sabor",
      location: "Nicaragua",
      badge1: "Tiempo completo",
      salary: "C$ 2,200",
      timePosted: "Hace 2 horas",
      logo: xyz,
      category: "cocineros",
    },
    {
      id: 5,
      title: "Desarrollador Web",
      company: "Empresa XYZ",
      location: "Nicaragua",
      badge1: "Tiempo completo",
      salary: "C$ 4,000",
      timePosted: "Hace 2 horas",
      logo: xyz,
      category: "programador",
    },
    {
      id: 6,
      title: "Diseñador UI/UX",
      company: "Agencia Creativa",
      location: "Nicaragua",
      badge1: "Tiempo completo",
      salary: "C$ 3,800",
      timePosted: "Hace 7 horas",
      logo: xyz,
      category: "diseñador",
    },
  ];

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredVacantes = vacantes.filter((vacante) => {
    const query = searchQuery.toLowerCase().trim();
    const selected = selectedCategory.toLowerCase();

    const matchesQuery =
      !query ||
      [
        vacante.title,
        vacante.company,
        vacante.location,
        vacante.badge1,
        vacante.salary,
        vacante.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      !selected || selected === "all" || vacante.category === selected;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="inicio-page">
      {/* Header */}
      <div className="inicio-header">
        <button className="menu-btn" aria-label="Abrir menú">
          <Menu size={20} />
        </button>

        <div className="logo-container">
          <img src={logo} className="logo" alt="Worksy" />
        </div>

        <div className="header-icons">
          <Link to="/notificaciones" aria-label="Notificaciones">
            <Bell className="icon" size={20} />
          </Link>
          <div className="profile-avatar">
            <UserRound size={20} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="inicio-search-container">
        <div className="search-wrapper">
          <span className="search-icon">
            <Search size={18} />
          </span>

          <input
            type="text"
            placeholder="Buscar empleos, empresas o servicios"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Categorías */}
      <div className="inicio-categories-section">
        <div className="section-header">
          <h2>Categoría</h2>

          <a href="#" className="see-all">
            Ver todas
          </a>
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <button
              key={index}
              type="button"
              className={`category-item ${selectedCategory === cat.value ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              <div className="category-icon">{cat.icon}</div>

              <p>{cat.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Vacantes */}
      <div className="inicio-vacantes-section">
        <h2>Vacantes recientes</h2>

        <div className="vacantes-grid">
          {filteredVacantes.length > 0 ? (
            filteredVacantes.map((vacante) => (
              <div key={vacante.id} className="vacante-card-inicio">
                <div className="vacante-header-inicio">
                  <div className="vacante-logo-inicio">
                    <img
                      src={vacante.logo}
                      alt={vacante.company}
                      className="vacante-logo-image"
                    />
                  </div>

                  <button
                    className="like-btn-inicio"
                    onClick={() => toggleLike(vacante.id)}
                    style={{
                      color: likedItems[vacante.id] ? "#ff4d6d" : "#bbb",
                    }}
                    aria-label="Me gusta"
                  >
                    <Heart
                      size={18}
                      fill={likedItems[vacante.id] ? "#ff4d6d" : "none"}
                      stroke={likedItems[vacante.id] ? "#ff4d6d" : "#bbb"}
                    />
                  </button>
                </div>

                <div className="vacante-info-inicio">
                  <h3>{vacante.title}</h3>

                  <p className="company">{vacante.company}</p>

                  <p className="location">{vacante.location}</p>
                </div>

                <div className="vacante-footer-inicio">
                  <span className="badge-inicio">{vacante.badge1}</span>

                  <span className="badge-inicio salary">{vacante.salary}</span>

                  <p className="time-posted">{vacante.timePosted}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No se encontraron vacantes para tu búsqueda.</p>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <House size={20} />
        </div>
        <div className="nav-item">
          <MessageCircleMore size={20} />
        </div>
        <div className="nav-item">
          <Plus size={20} />
        </div>
        <div className="nav-item">
          <UserRound size={20} />
        </div>
      </div>
    </div>
  );
}