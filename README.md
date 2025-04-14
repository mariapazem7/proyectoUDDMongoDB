# Proyecto 6

El objetivo de este proyecto es construir una aplicación backend que administre la autenticación y autorización de los usuarios.
Las herramientas utlizadad son: JWT, mongoose, mongoDB.
La aplicación incluye un modelo de usuario y un modelo de producto, que en esta oportunidad son libros. Los modelos estan relacionados entre sí a través de MongoDB y la aplicación
permite realizar operaciones CRUD, utilizando diferentes endpoints.

## Instalación
"Para instalar este proyecto"
- Utilizar Node.js y Express para el desarrollo del servidor.
- Utilizar MongoDB a través de mongoose para el desarrollo de los modelos.
- Contar con MongoDB Compass para observar los cambios de los documentos.
- Clona el repositorio.
- Accede a la carpeta a traves de la terminal que uses según tu preferencia.
- Realiza la isntalacion de dependencias con los comandos: npm install
- Ejecuta el proyecto con el script de dev: npm run dev


## Estructura del Proyecto

# proyectoUDDMongoDB
```bash
proyectoBUDD/
├── node_modules/
├── public/
├── src/
│   ├── config/
│   │   ├── db.config.js
│   │   └──  envs.config.js
│   │   
│   ├── coontrollers/
│   │   ├── auth.controller.js
│   │   └── libros/controller.js
│   │   
│   ├── Error/
│   │   ├── CustomError.js
│   │   └── TypeError.js    
│   │   
│   ├── middlewares/ 
│   │   ├── auth.middleware.js
│   │   ├── errorhandler.js
│   │   └── verifyAdmin.middleware.js
│   │  
│   ├── routers/ 
│   │   ├── auth.routes.js
│   │   ├── index.routes.js
│   │   └── libros.routes.js
│   │      
│   ├── services/
│   │   ├── db
│   │   │   └── updateDocs.js
│   │   ├── auth.service.js
│   │   └── libros.service.js
│   │ 
│   ├── utils/
│   │   ├── formateUserCreate.js
│   │   ├── hashPassword.js
│   │   ├── validateLibroCrate.js
│   │   └── validateLibroUpdate.js
│   │      
│   └──server.js
│  
├── .enve.templete
├── .gitignore
├── eslintrc.config.js
├── package-lock.json
├── package.json
└── README.md


```
