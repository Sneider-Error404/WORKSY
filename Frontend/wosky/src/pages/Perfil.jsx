import { useEffect, useState } from "react";
import { ArrowLeft, BriefcaseBusiness, ChevronRight, FileText, GraduationCap, LockKeyhole, Palette, Pencil, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import "./Perfil.css";

const profileLinks = [
  { label: "Habilidades", icon: GraduationCap },
  { label: "Archivos", icon: FileText },
  { label: "Proyectos", icon: BriefcaseBusiness },
  { label: "Experiencias", icon: Palette },
];

export default function Perfil() {
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    return () => {
      if (profilePhoto) URL.revokeObjectURL(profilePhoto);
    };
  }, [profilePhoto]);

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files?.[0];
    if (selectedPhoto) setProfilePhoto(URL.createObjectURL(selectedPhoto));
  };

  return (
    <main className="perfil-page">
      <div className="profile-shape profile-shape-top" />
      <div className="profile-shape profile-shape-bottom" />

      <header className="perfil-header">
        <Link to="/inicio" className="perfil-back" aria-label="Volver al inicio"><ArrowLeft size={24} /></Link>
      </header>

      <section className="perfil-card" aria-labelledby="profile-name">
        <div className="perfil-summary">
          <label className="perfil-avatar" aria-label="Cambiar foto de perfil">
            {profilePhoto ? <img src={profilePhoto} alt="Foto de perfil de Ligia Morales" /> : <><div className="avatar-hair" /><UserRound size={64} strokeWidth={1.4} /></>}
            <span className="avatar-photo-hint">Cambiar foto</span>
            <span className="avatar-badge">LM</span>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>

          <div className="perfil-identity">
            <div className="identity-heading">
              <h1 id="profile-name">Ligia Morales</h1>
              <button className="icon-action" type="button" aria-label="Editar perfil" title="Editar perfil"><Pencil size={15} /></button>
            </div>
            <p>Estudiante de Medicina</p>
            <p>UNAN - Managua</p>
          </div>
        </div>

        <div className="profile-stats" aria-label="Resumen del perfil">
          <Link to="/postulaciones" className="profile-stat"><strong>12</strong><span>Postulaciones</span></Link>
          <div className="profile-stat"><strong>8</strong><span>Favoritos</span></div>
          <div className="profile-stat"><strong>5</strong><span>Servicios</span></div>
        </div>

        <div className="profile-links">
          {profileLinks.map(({ label, icon: Icon }) => (
            <button className="profile-link" type="button" key={label}>
              <span className="profile-link-icon"><Icon size={28} strokeWidth={2.2} /></span>
              <span>{label}</span>
              <ChevronRight size={20} strokeWidth={1.8} />
            </button>
          ))}
        </div>

        <button className="account-switch" type="button"><LockKeyhole size={17} /><span>Cambiar tipo de cuenta</span></button>
      </section>
    </main>
  );
}
