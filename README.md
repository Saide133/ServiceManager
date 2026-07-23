# ServiceManager API

API REST construida con Express para gestionar los servicios de un gimnasio, conectando rutas HTTP con una clase `ServiceManager` que maneja la lógica de negocio.

Este proyecto es la segunda entrega del curso Backend de Coderhouse, construida sobre el `ServiceManager` del entregable anterior (aprobado 80%).

## Stack

- Node.js + Express (ESM)
- dotenv para configuración de entorno
- Datos persistidos en un archivo `services.json` (en memoria durante la ejecución)

## Instalación

```bash
git clone https://github.com/Saide133/ServiceManager.git
cd ServiceManager
npm install
```

Creá un archivo `.env` en la raíz del proyecto, basado en `.env.example`:

PORT=8080
NODE_ENV=development

## Cómo correrlo

```bash
node src/server.js
```

El servidor va a estar disponible en `http://localhost:8080`.

## Endpoints

Todos los endpoints tienen como base `/api/services`.

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/api/services` | Devuelve todos los servicios. Acepta filtros opcionales `?category=` y `?available=true/false` | 200 |
| GET | `/api/services/:sid` | Devuelve un servicio por id | 200 / 404 |
| POST | `/api/services` | Crea un servicio nuevo a partir del body | 201 / 400 |
| PUT | `/api/services/:sid` | Actualiza un servicio existente (no permite modificar el `id`) | 200 / 404 |
| DELETE | `/api/services/:sid` | Elimina un servicio por id | 200 / 404 |

### Body esperado para POST y PUT

```json
{
    "name": "Pilates",
    "description": "Clase de pilates reformer",
    "duration": 50,
    "price": 800,
    "category": "fuerza",
    "available": true
}
```

## Estructura del proyecto

src/
config/env.config.js → configuración de entorno con dotenv
managers/ServiceManager.js → lógica de negocio (CRUD de servicios)
routes/services.router.js → rutas HTTP, conecta Express con el manager
data/services.json → datos de los servicios
app.js → configuración de Express (middlewares, rutas)
server.js → arranque del servidor

## Decisiones de diseño

- **Generación de `id` con `crypto.randomUUID()`**: en vez de calcular el id como `length + 1`, se usa `randomUUID()` para evitar colisiones — si se elimina un servicio y se crea uno nuevo, un cálculo basado en la longitud del array podría reutilizar un id ya existido antes.
- **Separación de responsabilidades**: `ServiceManager` no depende de Express ni conoce `req`/`res` — solo recibe datos simples como parámetros, lo que permite reutilizarlo fuera del contexto de una API HTTP.
- **Persistencia en memoria**: los cambios (crear, actualizar, eliminar) se aplican sobre el array en memoria durante la ejecución del servidor. No se escriben de vuelta al archivo `services.json` — al reiniciar el servidor, los datos vuelven a su estado original.

## Autora

Lu — [GitHub](https://github.com/Saide133)