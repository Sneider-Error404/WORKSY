import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import "./Empresa.css";

export default function Empresa() {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogoChange = (event) => {
    const selectedLogo = event.target.files?.[0];

    if (selectedLogo) {
      setLogoPreview(URL.createObjectURL(selectedLogo));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Debes iniciar sesión para crear una empresa.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/perfil-empresa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre_empresa: companyName,
            descripcion: description,
            sector: null,
            logo_empresa: null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No se pudo crear la empresa.");
        return;
      }

      setError("");

      navigate("/empresa-creada", {
        state: {
          companyName,
          logoPreview,
        },
      });

    } catch (error) {
      console.error("Error al crear empresa:", error);
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <main className="company-page">
      <header className="company-header">
        <Link
          to="/cambiar-cuenta"
          className="company-back"
          aria-label="Volver a cambiar cuenta"
        >
          <ArrowLeft size={28} />
        </Link>
      </header>

      <section
        className="company-panel"
        aria-labelledby="company-title"
      >
        <h1 id="company-title">
          Informacion de tu Empresa
        </h1>

        <form
          className="company-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Nombre de la Empresa.."
            aria-label="Nombre de la Empresa"
            value={companyName}
            onChange={(event) =>
              setCompanyName(event.target.value)
            }
            required
          />

          <textarea
            placeholder="Descripción de la Empresa......"
            aria-label="Descripción de la Empresa"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            required
          />

          <div className="logo-field">
            <label htmlFor="company-logo">
              Logo de la Empresa
            </label>

            <div className="logo-upload-row">
              <label
                className="logo-upload"
                htmlFor="company-logo"
              >
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Vista previa del logo"
                  />
                ) : (
                  <Upload size={25} />
                )}

                <span>Subir logo</span>
              </label>

              <span className="logo-help">
                PNG o JPG. Máx 2MB
              </span>
            </div>

            <input
              id="company-logo"
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleLogoChange}
            />
          </div>

          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="company-submit"
          >
            Crear Empresa
          </button>
        </form>
      </section>
    </main>
  );
}