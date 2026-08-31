import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  GraduationCap,
  LockKeyhole,
  Palette,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Perfil.css";
import uraccanLogo from "../assets/OIP.webp";

const profileLinks = [
  { label: "Habilidades", icon: GraduationCap },
  { label: "Archivos", icon: FileText },
  { label: "Proyectos", icon: BriefcaseBusiness },
  { label: "Experiencias", icon: Palette },
];

export default function Perfil() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const [editando, setEditando] = useState(false);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    universidad: "",
    carrera: "",
    descripcion_personal: "",
    disponibilidad_laboral: "",
    primer_empleo: true,
  });

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No hay una sesión iniciada.");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/usuarios/perfil",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "No se pudo cargar el perfil.");
          return;
        }

        setUsuario(data);

        setFormulario({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          telefono: data.telefono || "",
          universidad: data.universidad || "",
          carrera: data.carrera || "",
          descripcion_personal: data.descripcion_personal || "",
          disponibilidad_laboral: data.disponibilidad_laboral || "",
          primer_empleo: data.primer_empleo ?? true,
        });

      } catch (error) {
        console.error("Error al obtener perfil:", error);
        setError("No se pudo conectar con el servidor.");
      }
    };

    obtenerPerfil();
  }, []);

  useEffect(() => {
    return () => {
      if (profilePhoto) {
        URL.revokeObjectURL(profilePhoto);
      }
    };
  }, [profilePhoto]);

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files?.[0];

    if (selectedPhoto) {
      setProfilePhoto(URL.createObjectURL(selectedPhoto));
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const guardarPerfil = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/usuarios/perfil",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formulario),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No se pudo actualizar el perfil.");
        return;
      }

      setUsuario(data);
      setEditando(false);
      setError("");

    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setError("No se pudo conectar con el servidor.");
    }
  };

  const obtenerIniciales = () => {
    if (!usuario) return "";

    const inicialNombre = usuario.nombre?.charAt(0) || "";
    const inicialApellido = usuario.apellido?.charAt(0) || "";

    return `${inicialNombre}${inicialApellido}`.toUpperCase();
  };

  return (
    <main className="perfil-page">
      <div className="profile-shape profile-shape-top" />
      <div className="profile-shape profile-shape-bottom" />

      <header className="perfil-header">
        <Link
          to="/inicio"
          className="perfil-back"
          aria-label="Volver al inicio"
        >
          <ArrowLeft size={24} />
        </Link>
      </header>

      <section className="perfil-card">
        {error && (
          <p className="perfil-error">
            {error}
          </p>
        )}

        {!editando ? (
          <>
            <div className="perfil-summary">
              <label
                className="perfil-avatar"
                aria-label="Cambiar foto de perfil"
              >
                <img
                  src={
                    profilePhoto ||
                    usuario?.foto_perfil ||
                    uraccanLogo
                  }
                  alt="Foto de perfil"
                />

                <span className="avatar-photo-hint">
                  Cambiar foto
                </span>

                <span className="avatar-badge">
                  {obtenerIniciales()}
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>

              <div className="perfil-identity">
                <div className="identity-heading">
                  <h1>
                    {usuario
                      ? `${usuario.nombre} ${usuario.apellido}`
                      : "Cargando..."}
                  </h1>

                  <button
                    className="icon-action"
                    type="button"
                    onClick={() => setEditando(true)}
                    aria-label="Editar perfil"
                    title="Editar perfil"
                  >
                    <Pencil size={15} />
                  </button>
                </div>

                <p>
                  {usuario?.carrera || "Carrera no especificada"}
                </p>

                <p>
                  {usuario?.universidad || "Universidad no especificada"}
                </p>
              </div>
            </div>

            <div className="profile-stats">
              <Link
                to="/postulaciones"
                className="profile-stat"
              >
                <strong>12</strong>
                <span>Postulaciones</span>
              </Link>

              <div className="profile-stat">
                <strong>8</strong>
                <span>Favoritos</span>
              </div>

              <div className="profile-stat">
                <strong>5</strong>
                <span>Servicios</span>
              </div>
            </div>

            <div className="profile-links">
              {profileLinks.map(({ label, icon: Icon }) => (
                <button
                  className="profile-link"
                  type="button"
                  key={label}
                >
                  <span className="profile-link-icon">
                    <Icon size={28} strokeWidth={2.2} />
                  </span>

                  <span>{label}</span>

                  <ChevronRight
                    size={20}
                    strokeWidth={1.8}
                  />
                </button>
              ))}
            </div>

            <Link
              to="/cambiar-cuenta"
              className="account-switch"
            >
              <LockKeyhole size={17} />
              <span>Cambiar tipo de cuenta</span>
            </Link>
          </>
        ) : (
          <form
            className="perfil-edit-form"
            onSubmit={guardarPerfil}
          >
            <h2>Editar perfil</h2>

            <div className="perfil-edit-grid">
              <label>
                Nombre
                <input
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Apellido
                <input
                  name="apellido"
                  value={formulario.apellido}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Teléfono
                <input
                  name="telefono"
                  value={formulario.telefono}
                  onChange={handleChange}
                />
              </label>

              <label>
                Universidad
                <input
                  name="universidad"
                  value={formulario.universidad}
                  onChange={handleChange}
                />
              </label>

              <label>
                Carrera
                <input
                  name="carrera"
                  value={formulario.carrera}
                  onChange={handleChange}
                />
              </label>

              <label>
                Disponibilidad
                <input
                  name="disponibilidad_laboral"
                  value={formulario.disponibilidad_laboral}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="perfil-description">
              Sobre mí
              <textarea
                name="descripcion_personal"
                value={formulario.descripcion_personal}
                onChange={handleChange}
              />
            </label>

            <label className="primer-empleo">
              <input
                type="checkbox"
                name="primer_empleo"
                checked={formulario.primer_empleo}
                onChange={handleChange}
              />
              Busco mi primer empleo
            </label>

            <div className="perfil-edit-actions">
              <button
                type="button"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>

              <button type="submit">
                Guardar cambios
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}