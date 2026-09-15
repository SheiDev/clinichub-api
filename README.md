# ClinicHub API

API REST para la gestión de una clínica: usuarios (registro y login) y pacientes (CRUD).

En este proyecto, **los pacientes son los ítems del sistema**. Equivalen a las rutas `/items` de la consigna: listar, crear, editar y eliminar recursos.

El backend está hecho con Node.js y Express, arquitectura por capas y autenticación con JWT.

Repositorio: [https://github.com/SheiDev/clinichub-api](https://github.com/SheiDev/clinichub-api)

## Tecnologías utilizadas

- Node.js y Express
- JavaScript
- JSON como almacenamiento de datos
- bcrypt para el hash de contraseñas
- JSON Web Token (JWT) para autenticación
- dotenv para variables de entorno
- Thunder Client para probar la API
- pnpm como gestor de paquetes (también se puede usar npm)

## Requisitos

- Node.js
- pnpm o npm

## Instalación

```bash
git clone https://github.com/SheiDev/clinichub-api.git
cd clinichub-api/backend
```

Con pnpm:

```bash
pnpm install
```

Con npm:

```bash
npm install
```

## Variables de entorno

En la carpeta `backend` crea un archivo `.env` (no se sube a GitHub):

```env
PORT=3000
JWT_SECRET=tu_secreto_jwt
```

## Ejecución

Desarrollo (recarga automática con nodemon):

```bash
pnpm run dev
```

o:

```bash
npm run dev
```

Producción / mismo comando que se usaría en el servidor:

```bash
npm start
```

La API queda en:

```text
http://localhost:3000
```

## Estructura del proyecto

```text
backend/
├── controllers/
├── data/
├── middlewares/
├── models/
├── routes/
├── services/
├── .gitignore
├── config.js
├── index.js
└── package.json
```

El archivo `.env` se crea en local dentro de `backend/` y no forma parte del repositorio.

Arquitectura:

```text
Routes → Controllers → Services → Models → JSON
```

## Autenticación

Tras un login correcto, el servidor devuelve un token.

Hay que enviarlo en el header:

```text
Authorization: Bearer <token>
```

En Thunder Client: pestaña **Auth** → Bearer Token, o el mismo header en **Headers**.

Las rutas de pacientes y `GET /private` requieren token.

## Endpoints

### Usuarios

#### Registrar usuario

```http
POST /users/register
```

Body:

```json
{
  "name": "Sam",
  "email": "sam@email.com",
  "password": "123456"
}
```

Respuesta `201`:

```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": "123456789",
    "name": "Sam",
    "email": "sam@email.com"
  }
}
```

La contraseña se guarda hasheada en el servidor y **no se devuelve** en la respuesta.

Si el correo ya existe: `409`. Si faltan campos: `400`.

#### Iniciar sesión

```http
POST /users/login
```

Body:

```json
{
  "email": "sam@email.com",
  "password": "123456"
}
```

Respuesta `200`:

```json
{
  "message": "Login exitoso",
  "user": {
    "id": "123456789",
    "name": "Sam",
    "email": "sam@email.com"
  },
  "token": "eyJ..."
}
```

Credenciales incorrectas: `401`.

### Pacientes (ítems del sistema)

Todas estas rutas requieren `Authorization: Bearer <token>`.

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/patients` | Listar (con filtro opcional por nombre) |
| `POST` | `/patients` | Crear |
| `GET` | `/patients/:id` | Obtener uno |
| `PUT` | `/patients/:id` | Editar |
| `DELETE` | `/patients/:id` | Eliminar |

#### Crear paciente

```http
POST /patients
```

```json
{
  "name": "María González",
  "email": "maria@gmail.com",
  "phone": "3005555555",
  "document": "1234567890"
}
```

Respuesta `201`. Campos incompletos o email inválido: `400`.

#### Listar pacientes

```http
GET /patients
```

#### Buscar por nombre (case insensitive)

```http
GET /patients?name=maria
```

La búsqueda no distingue mayúsculas, ignora tildes y admite coincidencia parcial. `maria`, `MARIA`, `María` o `mar` pueden devolver `María González`.

#### Obtener, actualizar y eliminar

```http
GET /patients/:id
PUT /patients/:id
DELETE /patients/:id
```

Ejemplo de `PUT`:

```json
{
  "phone": "3005555555"
}
```

Si el id no existe: `404`.

### Ruta protegida de prueba

```http
GET /private
```

```json
{
  "message": "Entraste a una ruta protegida",
  "user": {
    "id": "123456789",
    "email": "sam@email.com"
  }
}
```

Sin token o con token inválido: `401`.

## Códigos de respuesta

| Situación | Código |
|---|---:|
| OK | 200 |
| Recurso creado | 201 |
| Datos inválidos o body incompleto | 400 |
| No autenticado o token inválido | 401 |
| Recurso o ruta no encontrada | 404 |
| Correo ya registrado | 409 |
| Error interno | 500 |

```json
{
  "error": "Todos los campos son obligatorios"
}
```

```json
{
  "error": "Ruta no encontrada"
}
```

## Despliegue en Render

1. Conecta este repositorio a un **Web Service** en [Render](https://render.com).
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `node index.js`
5. En Environment agrega `JWT_SECRET` (y `PORT` lo asigna Render).

Cuando el servicio esté en línea, pega aquí la URL pública:

```text
https://TU-SERVICIO.onrender.com
```

## Pruebas

Los endpoints se probaron con Thunder Client:

- Registro, login y JWT
- Validación de campos y correos duplicados
- Acceso con token válido / rechazo sin token
- CRUD de pacientes
- Búsqueda por nombre case-insensitive
- Recursos y rutas inexistentes

## Seguridad

- Contraseñas hasheadas con bcrypt
- Rutas privadas con JWT
- `.env` en `.gitignore`

## Autor

**SheiDev** — [https://github.com/SheiDev](https://github.com/SheiDev)
