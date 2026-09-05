import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./CrearVacante.css";

export default function CrearVacante() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [salario, setSalario] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [tipoEmpleo, setTipoEmpleo] = useState("");
  const [requiereExperiencia, setRequiereExperiencia] = useState(false);
  const [aceptaPrimerEmpleo, setAceptaPrimerEmpleo] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Debes iniciar sesión para publicar una vacante.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/vacantes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            titulo: titulo,
            descripcion: descripcion,
            salario: salario ? Number(salario) : null,
            modalidad: modalidad,
            tipo_empleo: tipoEmpleo,
            requiere_experiencia: requiereExperiencia,
            acepta_primer_empleo: aceptaPrimerEmpleo,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No se pudo crear la vacante.");
        return;
      }

      setError("");

      console.log("Vacante creada:", data);

      navigate("/mi-empresa");

    } catch (error) {
      console.error("Error al crear vacante:", error);

      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <main className="create-vacancy-page">

      <header className="create-vacancy-header">
        <Link
          to="/mi-empresa"
          aria-label="Volver a mi empresa"
        >
          <ArrowLeft size={26} />
        </Link>
      </header>

      <form
        className={`create-vacancy-form ${
          step === 1 ? "step-one" : "step-two"
        }`}
        onSubmit={handleSubmit}
      >

        <section
          className={`create-vacancy-panel ${
            step === 1 ? "is-active" : "is-hidden"
          }`}
        >
          <h1>Crear vacante</h1>

          <label>
            Título del puesto
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </label>

          <label>
            Salario
            <input
              type="number"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
          </label>

          <label>
            Descripción
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </label>

          <button
            type="button"
            onClick={() => setStep(2)}
          >
            Siguiente
          </button>
        </section>

        <section
          className={`create-vacancy-panel ${
            step === 2 ? "is-active" : "is-hidden"
          }`}
        >
          <h1>Detalles de la vacante</h1>

          <label>
            Modalidad
            <select
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
              required
            >
              <option value="">Selecciona</option>
              <option value="Presencial">Presencial</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </label>

          <label>
            Tipo de empleo
            <select
              value={tipoEmpleo}
              onChange={(e) => setTipoEmpleo(e.target.value)}
              required
            >
              <option value="">Selecciona</option>
              <option value="Tiempo completo">
                Tiempo completo
              </option>
              <option value="Medio tiempo">
                Medio tiempo
              </option>
              <option value="Contrato">
                Contrato
              </option>
            </select>
          </label>

          <fieldset>
            <legend>Requiere experiencia</legend>

            <label>
              <input
                type="radio"
                name="experience"
                checked={requiereExperiencia === true}
                onChange={() => setRequiereExperiencia(true)}
              />
              Sí
            </label>

            <label>
              <input
                type="radio"
                name="experience"
                checked={requiereExperiencia === false}
                onChange={() => setRequiereExperiencia(false)}
              />
              No
            </label>
          </fieldset>

          <fieldset>
            <legend>Acepta primer empleo</legend>

            <label>
              <input
                type="radio"
                name="first-job"
                checked={aceptaPrimerEmpleo === true}
                onChange={() => setAceptaPrimerEmpleo(true)}
              />
              Sí
            </label>

            <label>
              <input
                type="radio"
                name="first-job"
                checked={aceptaPrimerEmpleo === false}
                onChange={() => setAceptaPrimerEmpleo(false)}
              />
              No
            </label>
          </fieldset>

          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          <div className="vacancy-actions">

            <button
              type="button"
              onClick={() => setStep(1)}
            >
              Anterior
            </button>

            <button type="submit">
              Publicar vacante
            </button>

          </div>
        </section>

      </form>
    </main>
  );
}