# Coworqueen: Gestión de Coworking 

<div align="left">
<img src="https://github.com/JonathanADB/Coworking/blob/main/backend/img/logo.png">
</div> 
<br>
"Coworqueen" es una plataforma web que facilita la publicación, reserva y gestión de espacios de coworking para empresas.
<br><br>

<div display="flex">
    <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white">
</div>

## Autores

- Daniela del Carmen Alvarez Carrasquel
- Jorge Alberto Pérez Lehmann
- Eduardo Martínez Frutos
- Pablo Campuzano Fuente

## Requisitos Previos

- Node.js (v14.x o superior)
- npm (v6.x o superior)

## Instalación

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/usuario/nombre-del-proyecto.git
   ```
   
2. Instalar dependencias:
## Configuración

1. Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

    ```sh
    MODE=
    CORS_ORIGIN=
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASS=
    DB_NAME=
    JWT_SECRET=
    API_HOST=
    VITE_APP_HOST=
    FRONTEND_HOST=
    BREVO_API_KEY= 
    SMTP_HOST=
    SMTP_PORT=
    SMTP_USER=
    SMTP_PASS=
    ```

2. Después de crear el archivo .env, inicializar la base de datos ejecutando el siguiente comando en la terminal:
    
    ```sh
   npm run init-db
   ```

## Inicialización
    
Para iniciar el servidor de desarrollo:

    cd backend
    npm install

Para iniciar el servidor en producción:

    npm start


# Endpoints

Después de crear un usuario, validarse e iniciar sesión se generará un token que será necesario incluir en autorización en las cabeceras de las peticiones subsiguientes.

## USER - Renombrar a account/auth

<ul style="list-style-type: none;">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /users - permite la creación de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /users/validate - valida la cuenta de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /auth/login - inicia sesión en el servicio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PUT-blue?style=for-the-badge" style="margin-right: 10px;">
        /users/profile - actualiza el perfil del usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /users/password - cambia la contraseña
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /auth/forgot-password - olvido de contraseña
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /auth/reset-password - reinicio de contraseña
    </li>
</ul>

## USER

<ul style="list-style-type: none;">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /admin/users - lista todos los usuarios
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /users/:userId - devuelve la información de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /admin/users/role/:userId - cambia el rol de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /admin/users/delete/:userId - elimina un usuario
    </li>

</ul>

## ROOMS

<ul style="list-style-type: none;">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /rooms/create-room - creación de un espacio con nombre, descripción, etc (admin)
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PUT-blue?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:id - actualización de datos de un espacio (admin)
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:id - eliminación de un espacio (admin)
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms - obtener todos los espacios
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:roomId - obtener información de un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:roomId/equipment - listado del equipo de un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:roomId/equipment - añadir equipo a un espacio
    </li>
</ul>

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /equipment/add - agregar equipos (solo admin)
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /equipment/:equipmentId - actualización de datos de un equipo (solo admin)
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /admin/equipment/delete/:equipmentId - eliminación de un equipo (solo admin)
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /admin/equipment/:equipmentId - obtener información de un equipo (solo admin)
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /equipment - listar todos los equipos disponibles (solo admin)
    </li>
</ul>

## RESERVATIONS

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reservations/:userId - listado de reservas de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /reservation/:roomId - creación de reserva
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /reservation/:reservationId - cancelación de reserva
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reservations/by-reservationId/:reservationId - reserva por id de reserva
    </li>
</ul>

## REVIEWS

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reviews - ver todas las reviews
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reviews/by-userId/:userId - listado de reviews por usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reviews/by-roomId/:roomId - listado de reviews por sala
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reviews/by-reservationId/:reservationId - listado de reviews por reserva
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /review/create/:reservationId - crear review
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /review/delete/:reviewId - borrar review
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /review/edit/:reviewId - editar review
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /review/:reviewId - obtener detalles de una review por su id
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /review/check - verificar si el usuario tiene una reserva para hacer review
    </li>
</ul>

## INCIDENTS

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents - lista de incidencias (Admin)
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents/:incidentId - lista de incidencias
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents/by-userid/:userId - lista de incidencias por usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents/by-roomid/:roomId - lista de incidencias por sala
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents/by-equipmentid/:equipmentId - lista de incidencias por equipo
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /incidents/:incidentId - modificar incidencia como Admin
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /incidents/:incidentId - eliminar incidencia creada por un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /incidents/:incidentId - eliminar incidencia como Admin
    </li>
</ul>

## MEDIA

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /user/:id/media/add-avatar - añadir un avatar
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /room/:id/cover - añadir portada de un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /room/:id/images - añadir imágenes de un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /incident/:id/media/add-media - añadir imagen a incidencia
    </li>
</ul>

## SEARCH

<ul style="list-style-type: none;">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms/types - búsqueda de rooms por tipo
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /equipment/searchlist - búsqueda para listar equipos
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms/searchReservations - búsqueda de reservas por sala y fecha
    </li>
</ul>