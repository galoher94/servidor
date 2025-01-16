# Backend README

## Proyecto: Gestión de Tareas (Backend)

Este proyecto es el backend para la aplicación de gestión de tareas. Desarrollado con **Node.js**, **Express**, y **JWT** para la autenticación.

### Características
- **Autenticación de Usuarios**: Login y Registro.
- **Gestión de Tareas**: CRUD completo.
- **Protección de Rutas**: Middleware de autenticación basado en JWT.

---

## Requisitos Previos

### Dependencias del Proyecto
Asegúrate de tener instaladas:
- [Node.js](https://nodejs.org/) (v16 o superior)
- [MongoDB](https://www.mongodb.com/) (Base de datos para almacenar usuarios y tareas)

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tareas
JWT_SECRET=tu_secreto_seguro
```

---

## Instalación y Uso

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar el Servidor en Desarrollo
```bash
npm run dev
```
El backend estará disponible en `http://localhost:5000`.

### 3. Generar la Build para Producción
```bash
npm run build
```

---

## Endpoints del API

### Rutas de Autenticación

- **POST /api/auth/register**: Registro de usuario.
- **POST /api/auth/login**: Inicio de sesión (retorna un token JWT).

### Rutas de Tareas (Protegidas)

- **GET /api/tareas**: Listar todas las tareas.
- **POST /api/tareas**: Crear una nueva tarea.
- **GET /api/tareas/:id**: Obtener una tarea específica.
- **PUT /api/tareas/:id**: Actualizar una tarea existente.
- **DELETE /api/tareas/:id**: Eliminar una tarea.

---

## Estructura de Datos

### Usuarios
Colección: `usuarios`
```json
{
  "_id": "ObjectId",
  "nombre": "string",
  "email": "string",
  "password": "string (hashed)",
  "fechaCreacion": "Date"
}
```

### Tareas
Colección: `tareas`
```json
{
  "_id": "ObjectId",
  "titulo": "string",
  "descripcion": "string",
  "completado": "boolean",
  "usuarioId": "ObjectId (referencia a usuarios)",
  "fechaCreacion": "Date",
  "fechaActualizacion": "Date"
}
```

---

## Middleware
- **Autenticación**: Asegura que el token JWT esté presente y sea válido antes de acceder a las rutas protegidas.

---
## Repositorio en GITHUB

https://github.com/galoher94/servidor.git


## Contribuciones
1. Haz un fork del proyecto.
2. Crea una rama para tu nueva característica: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza commits descriptivos: `git commit -m "Añade nueva funcionalidad"`.
4. Envía un pull request a la rama principal.