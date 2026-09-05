import { useEffect, useState } from "react";
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
  const [vacantes, setVacantes] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  const categories = [
    {
      icon: <Stethoscope size={34} strokeWidth={2} />,
      label: "Doctor",
      value: "doctor",
    },
    {
      icon: <Zap size={34} strokeWidth={2} />,
      label: "Electricistas",
      value: "electricistas",
    },
    {
      icon: <BriefcaseBusiness size={34} strokeWidth={2} />,
      label: "Gerentes",
      value: "gerentes",
    },
    {
      icon: <ChefHat size={34} strokeWidth={2} />,
      label: "Cocineros",
      value: "cocineros",
    },
    {
      icon: <Palette size={34} strokeWidth={2} />,
      label: "Diseñador",
      value: "diseñador",
    },
    {
      icon: <Code2 size={34} strokeWidth={2} />,
      label: "Programador",
      value: "programador",
    },
    {
      icon: <Heart size={34} strokeWidth={2} />,
      label: "Más",
      value: "all",
    },
  ];

  useEffect(() => {
    const obtenerVacantes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/vacantes"
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.error ||
            "No se pudieron cargar las vacantes."
          );
          setCargando(false);
          return;
        }

        setVacantes(data);
        setError("");
        setCargando(false);

      } catch (error) {
        console.error(
          "Error al cargar vacantes:",
          error
        );

        setError(
          "No se pudo conectar con el servidor."
        );

        setCargando(false);
      }
    };

    obtenerVacantes();
  }, []);

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatearSalario = (salario) => {
    if (!salario) return null;

    return `C$ ${Number(salario).toLocaleString()}`;
  };

  const calcularTiempoPublicado = (fecha) => {
    if (!fecha) return "";

    const fechaPublicacion = new Date(fecha);
    const ahora = new Date();

    const diferencia =
      ahora.getTime() -
      fechaPublicacion.getTime();

    const minutos = Math.floor(
      diferencia / (1000 * 60)
    );

    const horas = Math.floor(
      diferencia / (1000 * 60 * 60)
    );

    const dias = Math.floor(
      diferencia / (1000 * 60 * 60 * 24)
    );

    if (minutos < 1) {
      return "Publicado ahora";
    }

    if (minutos < 60) {
      return `Hace ${minutos} min`;
    }

    if (horas < 24) {
      return `Hace ${horas} ${
        horas === 1 ? "hora" : "horas"
      }`;
    }

    return `Hace ${dias} ${
      dias === 1 ? "día" : "días"
    }`;
  };

  const filteredVacantes = vacantes.filter(
    (vacante) => {
      const query =
        searchQuery.toLowerCase().trim();

      const categoria =
        vacante.categorias
          ?.nombre_categoria
          ?.toLowerCase() || "";

      const empresa =
        vacante.perfiles_empresa
          ?.nombre_empresa
          ?.toLowerCase() || "";

      const municipio =
        vacante.municipios
          ?.nombre_municipio
          ?.toLowerCase() || "";

      const titulo =
        vacante.titulo
          ?.toLowerCase() || "";

      const modalidad =
        vacante.modalidad
          ?.toLowerCase() || "";

      const tipoEmpleo =
        vacante.tipo_empleo
          ?.toLowerCase() || "";

      const matchesQuery =
        !query ||
        [
          titulo,
          empresa,
          municipio,
          modalidad,
          tipoEmpleo,
          categoria,
        ]
          .join(" ")
          .includes(query);

      const selected =
        selectedCategory.toLowerCase();

      const matchesCategory =
        selected === "all" ||
        categoria.includes(selected) ||
        titulo.includes(selected);

      return (
        matchesQuery &&
        matchesCategory
      );
    }
  );

  return (
    <div className="inicio-page">

      {/* Header */}
      <div className="inicio-header">
        <button
          className="menu-btn"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>

        <div className="logo-container">
          <img
            src={logo}
            className="logo"
            alt="Worksy"
          />
        </div>

        <div className="header-icons">
          <Link
            to="/notificaciones"
            aria-label="Notificaciones"
          >
            <Bell
              className="icon"
              size={20}
            />
          </Link>

          <Link
            to="/perfil"
            className="profile-avatar"
            aria-label="Abrir perfil"
          >
            <UserRound size={20} />
          </Link>
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
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            className="search-input"
          />

        </div>
      </div>

      {/* Categorías */}
      <div className="inicio-categories-section">

        <div className="section-header">
          <h2>Categoría</h2>

          <a
            href="#"
            className="see-all"
          >
            Ver todas
          </a>
        </div>

        <div className="categories-grid">

          {categories.map(
            (cat, index) => (
              <button
                key={index}
                type="button"
                className={`category-item ${
                  selectedCategory ===
                  cat.value
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(
                    cat.value
                  )
                }
              >

                <div className="category-icon">
                  {cat.icon}
                </div>

                <p>{cat.label}</p>

              </button>
            )
          )}

        </div>
      </div>

      {/* Vacantes */}
      <div className="inicio-vacantes-section">
        <h2>Vacantes recientes</h2>

        {error && (
          <p className="no-results">
            {error}
          </p>
        )}

        {cargando ? (
          <p className="no-results">
            Cargando vacantes...
          </p>
        ) : (
          <div className="vacantes-grid">

            {filteredVacantes.length > 0 ? (

              filteredVacantes.map(
                (vacante) => {

                  const empresa =
                    vacante.perfiles_empresa
                      ?.nombre_empresa ||
                    "Empresa";

                  const logoEmpresa =
                    vacante.perfiles_empresa
                      ?.logo_empresa;

                  const municipio =
                    vacante.municipios
                      ?.nombre_municipio;

                  const salario =
                    formatearSalario(
                      vacante.salario
                    );

                  return (
                    <div
                      key={
                        vacante.id_vacante
                      }
                      className="vacante-card-inicio"
                    >

                      <div className="vacante-header-inicio">

                        <div className="vacante-logo-inicio">
                          <img
                            src={
                              logoEmpresa ||
                              xyz
                            }
                            alt={empresa}
                            className="vacante-logo-image"
                          />
                        </div>

                        <button
                          className="like-btn-inicio"
                          onClick={() =>
                            toggleLike(
                              vacante.id_vacante
                            )
                          }
                          style={{
                            color:
                              likedItems[
                                vacante
                                  .id_vacante
                              ]
                                ? "#ff4d6d"
                                : "#bbb",
                          }}
                          aria-label="Me gusta"
                        >
                          <Heart
                            size={18}
                            fill={
                              likedItems[
                                vacante
                                  .id_vacante
                              ]
                                ? "#ff4d6d"
                                : "none"
                            }
                            stroke={
                              likedItems[
                                vacante
                                  .id_vacante
                              ]
                                ? "#ff4d6d"
                                : "#bbb"
                            }
                          />
                        </button>

                      </div>

                      <div className="vacante-info-inicio">

                        <h3>
                          {vacante.titulo}
                        </h3>

                        <p className="company">
                          {empresa}
                        </p>

                        {municipio && (
                          <p className="location">
                            {municipio}
                          </p>
                        )}

                      </div>

                      <div className="vacante-footer-inicio">

                        {vacante.tipo_empleo && (
                          <span className="badge-inicio">
                            {
                              vacante.tipo_empleo
                            }
                          </span>
                        )}

                        {salario && (
                          <span className="badge-inicio salary">
                            {salario}
                          </span>
                        )}

                        <p className="time-posted">
                          {calcularTiempoPublicado(
                            vacante.fecha_publicacion
                          )}
                        </p>

                      </div>

                    </div>
                  );
                }
              )

            ) : (
              <p className="no-results">
                No se encontraron vacantes para tu búsqueda.
              </p>
            )}

          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">

        <div className="nav-item active">
          <House size={20} />
        </div>

        <Link
          to="/chat"
          className="nav-item"
        >
          <MessageCircleMore
            size={20}
          />
        </Link>

        <div className="nav-item">
          <Plus size={20} />
        </div>

        <Link
          to="/perfil"
          className="nav-item"
          aria-label="Abrir perfil"
        >
          <UserRound size={20} />
        </Link>

      </div>

    </div>
  );
}