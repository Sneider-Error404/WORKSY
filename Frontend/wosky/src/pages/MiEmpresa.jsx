import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Plus
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import "./MiEmpresa.css";

function CompanyLogo({ small = false }) {
  return (
    <div
      className={`company-logo ${
        small ? "company-logo-small" : ""
      } company-logo-microsoft`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

export default function MiEmpresa() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [empresa, setEmpresa] = useState(null);
  const [vacantes, setVacantes] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  // Esta vista previa todavía es temporal
  const logoPreview = state?.logoPreview;

  useEffect(() => {
    const cargarEmpresa = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Debes iniciar sesión.");
          setCargando(false);
          return;
        }

        // Obtener perfil de empresa
        const responseEmpresa = await fetch(
          "http://localhost:3000/perfil-empresa/mio",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dataEmpresa = await responseEmpresa.json();

        if (!responseEmpresa.ok) {
          setError(
            dataEmpresa.error ||
            "No se pudo cargar la empresa."
          );

          setCargando(false);
          return;
        }

        setEmpresa(dataEmpresa);

        // Obtener vacantes de esta empresa
        const responseVacantes = await fetch(
          "http://localhost:3000/vacantes/mias",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dataVacantes = await responseVacantes.json();

        if (!responseVacantes.ok) {
          setError(
            dataVacantes.error ||
            "No se pudieron cargar las vacantes."
          );

          setCargando(false);
          return;
        }

        setVacantes(dataVacantes);
        setError("");
        setCargando(false);

      } catch (error) {
        console.error(
          "Error al cargar Mi Empresa:",
          error
        );

        setError(
          "No se pudo conectar con el servidor."
        );

        setCargando(false);
      }
    };

    cargarEmpresa();
  }, []);

  return (
    <main className="my-company-page">
      <header className="my-company-header">
        <Link
          to="/empresa-creada"
          className="my-company-back"
          aria-label="Volver"
        >
          <ArrowLeft size={25} />
        </Link>

        <button
          className="create-vacancy-button"
          type="button"
          onClick={() => navigate("/crear-vacante")}
        >
          <Plus size={17} />
          Crear vacante
        </button>
      </header>

      <section
        className="my-company-panel"
        aria-labelledby="my-company-title"
      >

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {cargando ? (
          <p>Cargando empresa...</p>
        ) : (
          <>
            <div className="my-company-summary">

              {logoPreview ? (
                <img
                  className="company-logo uploaded-company-logo"
                  src={logoPreview}
                  alt="Logo de la empresa"
                />
              ) : (
                <CompanyLogo />
              )}

              <div className="my-company-identity">
                <h1 id="my-company-title">
                  {empresa?.nombre_empresa ||
                    "Mi Empresa"}
                </h1>

                <p>
                  {empresa?.sector ||
                    "Sector no especificado"}
                </p>
              </div>

              <span className="verified-company">
                Verificado
              </span>
            </div>

            <div className="company-stats">
              <span>
                <strong>0</strong>
                Seguidores
              </span>

              <span>
                <strong>{vacantes.length}</strong>
                Vacantes
              </span>

              <span>
                <strong>--</strong>
                Calificación
              </span>
            </div>

            <div className="about-company">
              <h2>Sobre la empresa</h2>

              <p>
                {empresa?.descripcion ||
                  "No se ha agregado una descripción."}
              </p>

              <button type="button">
                Ver más...
              </button>
            </div>

            <div className="published-vacancies">
              <div className="vacancies-heading">
                <span>Vacantes publicadas</span>

                <button type="button">
                  Ver todos...
                </button>
              </div>

              {vacantes.length === 0 ? (
                <p>
                  Aún no has publicado vacantes.
                </p>
              ) : (
                vacantes.map((vacante) => (
                  <button
                    className="company-vacancy"
                    key={vacante.id_vacante}
                    type="button"
                  >
                    <CompanyLogo small />

                    <span>
                      <strong>
                        {vacante.titulo}
                      </strong>

                      <small>
                        {vacante.modalidad ||
                          "Modalidad no especificada"}
                        {" · "}
                        {vacante.tipo_empleo ||
                          "Tipo no especificado"}
                      </small>
                    </span>

                    <ChevronRight size={19} />
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}