# Coworqueen: Gestión de Coworking 

<div align="center">
<img src="https://github.com/JonathanADB/Coworking/blob/main/frontend/src/assets/imgreadme/titulo.png">
</div> 

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

# Endpoints
## USER

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


### Pasos para arrancar el backend

1. Abrir una terminal en la carpeta "backend".
2. Instalar las dependencias del proyecto con `npm install`.
3. Configurar el archivo `.env`.
4. Inicializar la base de datos con `npm run init-db`.
5. Arrancar el servidor con `npm run start`.

¡Con estos pasos, el servidor estará listo para ser probado usando POSTMAN!