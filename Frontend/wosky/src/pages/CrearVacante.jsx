import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./CrearVacante.css";

export default function CrearVacante() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/mi-empresa");
  };

  return (
    <main className="create-vacancy-page">
      <header className="create-vacancy-header">
        <Link to="/mi-empresa" aria-label="Volver a mi empresa"><ArrowLeft size={26} /></Link>
      </header>
      <form className={`create-vacancy-form ${step === 1 ? "step-one" : "step-two"}`} onSubmit={handleSubmit}>
        <section className={`create-vacancy-panel ${step === 1 ? "is-active" : "is-hidden"}`} aria-labelledby="create-vacancy-title">
          <h1 id="create-vacancy-title">Crear vacante</h1>
          <label>Tipo del puesto<input type="text" aria-label="Tipo del puesto" required /></label>
          <label>Tipo de empleado<input type="text" aria-label="Tipo de empleado" required /></label>
          <label>Ubicación<input type="text" aria-label="Ubicación" required /></label>
          <label>Salario<input type="text" aria-label="Salario" required /></label>
          <label>Descripción<textarea aria-label="Descripción" required /></label>
          <button type="button" onClick={() => setStep(2)}>Siguiente</button>
        </section>

        <section className={`create-vacancy-panel ${step === 2 ? "is-active" : "is-hidden"}`} aria-labelledby="vacancy-details-title">
          <h1 id="vacancy-details-title">Detalles de la vacante</h1>
          <label>Modalidad<select aria-label="Modalidad" required><option value="">Selecciona</option><option>Presencial</option><option>Remoto</option><option>Híbrido</option></select></label>
          <label>Tipo de empleo<select aria-label="Tipo de empleo" required><option value="">Selecciona</option><option>Tiempo completo</option><option>Medio tiempo</option><option>Contrato</option></select></label>
          <fieldset><legend>Requiere experiencia</legend><label><input type="radio" name="experience" value="si" /> Sí</label><label><input type="radio" name="experience" value="no" defaultChecked /> No</label></fieldset>
          <fieldset><legend>Acepta primer empleo</legend><label><input type="radio" name="first-job" value="si" /> Sí</label><label><input type="radio" name="first-job" value="no" defaultChecked /> No</label></fieldset>
          <label>Categoría<select aria-label="Categoría" required><option value="">Selecciona</option><option>Tecnología</option><option>Diseño</option><option>Administración</option></select></label>
          <label>Municipio<select aria-label="Municipio" required><option value="">Selecciona</option><option>Managua</option><option>León</option><option>Masaya</option></select></label>
          <label>Estado<select aria-label="Estado" required><option value="">Selecciona</option><option>Activa</option><option>Borrador</option></select></label>
          <label>Fecha de publicación<input type="date" defaultValue="2026-07-27" aria-label="Fecha de publicación" required /></label>
          <div className="vacancy-actions">
            <button type="button" onClick={() => setStep(1)}>Anterior</button>
            <button type="submit">Publicar vacante</button>
          </div>
        </section>
      </form>
    </main>
  );
}
