# 💼 WORKSY

  ![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)
  ![Express](https://img.shields.io/badge/Express.js-Framework-black?logo=express)
  ![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
  ![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
  ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite&logoColor=white)
  
  ---

# ¿Qué es WORKSY?

  **WORKSY** es una plataforma web desarrollada para facilitar la conexión entre personas que buscan empleo y empresas que necesitan talento.
  
  El proyecto nace con el propósito de brindar mayores oportunidades a jóvenes que desean obtener su **primer empleo**, permitiéndoles crear un perfil profesional, postularse a vacantes y ofrecer sus servicios, incluso sin contar con experiencia laboral.
  
  Las empresas, por su parte, pueden administrar sus perfiles, publicar ofertas laborales y gestionar las postulaciones de manera rápida y organizada.
  
  ---

# ¿Qué hace WORKSY?

  La plataforma permite administrar diferentes procesos relacionados con la búsqueda de empleo mediante una arquitectura cliente-servidor basada en una **API REST**.
  
  Entre sus principales funcionalidades se encuentran:
  
  - Registro e inicio de sesión de usuarios.
  - Gestión de perfiles de usuarios y empresas.
  - Publicación y administración de vacantes.
  - Gestión de postulaciones.
  - Publicación de servicios profesionales.
  - Seguimiento de empresas.
  - Organización de categorías y municipios.
  - Comunicación entre el frontend y el backend mediante una API REST.
  
  ---

# ¿Por qué se desarrolló WORKSY?
  
  Conseguir el primer empleo representa uno de los mayores desafíos para muchos jóvenes debido a la falta de experiencia laboral y al limitado acceso a oportunidades adaptadas a su perfil.
  
  Al mismo tiempo, muchas empresas enfrentan dificultades para encontrar candidatos adecuados de forma rápida y organizada.
  
  **WORKSY** busca reducir esa brecha mediante una plataforma moderna, intuitiva y accesible que facilite la conexión entre empresas y nuevos talentos.
  
  ---

# Alcance del sistema

  WORKSY está diseñado para simplificar la gestión de procesos de búsqueda de empleo y reclutamiento.
  
  El sistema permite administrar usuarios, empresas, vacantes, postulaciones y servicios dentro de una única plataforma, ofreciendo una experiencia sencilla tanto para candidatos como para empleadores.
  
  ---

# Tecnologías utilizadas

## Backend
  
  - Node.js
  - Express.js
  - Prisma ORM
  - MySQL
  - JWT (JSON Web Token)
  - bcrypt
  - dotenv

## Frontend
  
  - React
  - React Router DOM
  - React Icons
  - Lucide React
  - Vite
  - JavaScript (ES6+)
  - HTML5
  - CSS3

## Herramientas

  - Git
  - GitHub
  - Visual Studio Code
  - Postman
  - Figma
  - ESLint

---

# Funcionalidades principales

### 🔐 Autenticación
  
  - Registro de usuarios.
  - Inicio de sesión seguro.
  - Encriptación de contraseñas.

### 👤 Usuarios

  - Crear usuarios.
  - Consultar información.
  - Actualizar perfil.
  - Eliminar usuarios.

### 🏢 Empresas
  
  - Registro de perfiles empresariales.
  - Administración de información empresarial.
  - Actualización y eliminación de perfiles.

### 💼 Vacantes

  - Publicación de vacantes.
  - Consulta de ofertas laborales.
  - Actualización de vacantes.
  - Eliminación de vacantes.

### 📄 Postulaciones
  
  - Postulación a vacantes.
  - Consulta de postulaciones.
  - Cambio de estado.
  - Eliminación de postulaciones.

### 🛠 Servicios

  - Publicación de servicios.
  - Consulta de servicios.
  - Actualización de servicios.
  - Eliminación de servicios.

### ⭐ Seguimiento de empresas

  - Seguir empresas.
  - Consultar empresas seguidas.
  - Dejar de seguir empresas.
  
  ---

# Arquitectura del proyecto

  ```text
  WORKSY/
  │
  ├── Backend/
  │   ├── Mandos/
  │   ├── Prisma/
  │   ├── Rutas/
  │   ├── index.js
  │   ├── package.json
  │   └── prisma.config.ts
  │
  ├── Frontend/
  │   └── worksy/
  │       ├── Público/
  │       ├── src/
  │       │   ├── Activos/
  │       │   └── Páginas/
  │       ├── App.jsx
  │       ├── main.jsx
  │       ├── package.json
  │       └── vite.config.js
  ```

---
