# Gestión de Coworking 

<div align="center">
<img src="https://github.com/JonathanADB/Coworking/blob/main/frontend/src/assets/imgreadme/titulo.png">
</div> 

"Gestión de Coworking" es una aplicación web que facilita la publicación, reserva y gestión de espacios de coworking para empresas.
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

<ul>
<li display="flex">
    <img src="https://img.shields.io/badge/POST-red?style=for-the-badge&logoColor=000000
    ">/register - permite la creación de un usuario</li>

<li>[POST] /validate - valida la cuenta de un usuario
</li>
<li>[POST] /login - inicia sesión en el servicio
</li>
<li>[PUT] /user/update/profile
</li>
<li>[PATCH] /change-password
</li>
<li>[POST] /forgot-password
</li>
<li>[POST] /reset-password
</li>

</ul>


### Pasos para arrancar el backend

1. Abrir una terminal en la carpeta "backend".
2. Instalar las dependencias del proyecto con `npm install`.
3. Configurar el archivo `.env`.
4. Inicializar la base de datos con `npm run init-db`.
5. Arrancar el servidor con `npm run start`.

¡Con estos pasos, el servidor estará listo para ser probado usando POSTMAN!