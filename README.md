# ClinicHub API

API REST de una clínica. Los pacientes son los ítems del sistema (listar, crear, editar y eliminar).

Repo: https://github.com/SheiDev/clinichub-api

## Cómo correrlo

```bash
git clone https://github.com/SheiDev/clinichub-api.git
cd clinichub-api/backend
npm install
```

Crea un archivo `.env` en `backend/` (no se sube a GitHub):

```
PORT=3000
JWT_SECRET=tu_secreto_jwt
```

```bash
npm run dev
```

Queda en http://localhost:3000

## Rutas

**Usuarios** (sin token)

- `POST /users/register` → `{ "name", "email", "password" }`
- `POST /users/login` → `{ "email", "password" }` (devuelve `token`)

**Pacientes** (llevan token: `Authorization: Bearer <token>`)

- `GET /patients`
- `GET /patients?name=maria` (no distingue mayúsculas ni tildes)
- `GET /patients/:id`
- `POST /patients` → `{ "name", "email", "phone", "document" }`
- `PUT /patients/:id`
- `DELETE /patients/:id`

También: `GET /private` (para probar el token).

## Render

URL: *(cuando esté desplegado)*

En Render: Root Directory `backend`, build `npm install`, start `node index.js`, y la variable `JWT_SECRET`.
