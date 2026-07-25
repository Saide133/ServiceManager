# Sistema Backend de Turnos y Reservas

API REST construida con Express y FileSystem para gestionar dos recursos: **servicios** disponibles para reservar turnos, y **reservas** creadas por los clientes.

Este proyecto es la tercera entrega del curso Backend de Coderhouse, construida sobre el `ServiceManager` de la entrega anterior.

## Stack

- Node.js + Express (ESM)
- dotenv para configuración de entorno
- Persistencia en archivos JSON (`services.json`, `bookings.json`)

## Instalación

```bash
git clone https://github.com/Saide133/ServiceManager.git
cd ServiceManager
npm install
```

Creá un archivo `.env` en la raíz del proyecto, basado en `.env.example`:

```
PORT=8080
NODE_ENV=development
```

## Cómo correrlo

```bash
node src/server.js
```

El servidor va a estar disponible en `http://localhost:8080`.

## Endpoints

### Servicios (`/api/services`)

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/api/services` | Devuelve todos los servicios. Acepta filtros opcionales `?category=` y `?available=true/false` | 200 |
| GET | `/api/services/:sid` | Devuelve un servicio por id | 200 / 404 |
| POST | `/api/services` | Crea un servicio (el `id` se genera automáticamente) | 201 / 400 |
| PUT | `/api/services/:sid` | Actualiza un servicio existente (no permite modificar el `id`) | 200 / 404 |
| DELETE | `/api/services/:sid` | Elimina un servicio por id | 200 / 404 |

### Reservas (`/api/bookings`)

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| POST | `/api/bookings` | Crea una reserva (puede iniciarse con `services` vacío) | 201 / 400 |
| GET | `/api/bookings/:bid` | Devuelve una reserva por id | 200 / 404 |
| POST | `/api/bookings/:bid/services/:sid` | Agrega un servicio a una reserva existente, validando que ambos existan | 200 / 404 |

### Body esperado para POST/PUT de servicios

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

### Body esperado para POST de reservas

```json
{
    "clientName": "Ana Pérez",
    "clientEmail": "ana@mail.com",
    "date": "2026-07-30",
    "time": "15:00"
}
```

El campo `services` es opcional (por defecto arranca en `[]`) y `status` se genera automáticamente como `"pending"`.

## Estructura del proyecto

```
src/
  config/env.config.js         → configuración de entorno con dotenv
  managers/
    ServiceManager.js          → lógica de negocio de servicios
    BookingManager.js          → lógica de negocio de reservas
  routes/
    services.router.js         → rutas HTTP de servicios
    bookings.router.js         → rutas HTTP de reservas
  data/
    services.json              → datos de servicios
    bookings.json              → datos de reservas
  app.js                       → configuración de Express (middlewares, rutas)
  server.js                    → arranque del servidor
```

## Decisiones de diseño

- **Generación de `id` con `crypto.randomUUID()`**: evita colisiones al eliminar y crear elementos, a diferencia de un cálculo basado en `length`.
- **Separación de responsabilidades**: los managers no dependen de Express ni conocen `req`/`res` — solo reciben datos simples como parámetros.
- **Instancia compartida entre managers**: `BookingManager` recibe una instancia de `ServiceManager` por parámetro (no crea la suya propia), para que ambos trabajen sobre los mismos datos en memoria y puedan validar de forma cruzada que un servicio existe antes de agregarlo a una reserva.
- **Relación reserva-servicio sin duplicar datos**: dentro de una reserva, cada servicio se guarda como `{ service: id, quantity }` — solo el id de referencia, no el objeto completo. Si el mismo servicio se agrega más de una vez, se incrementa `quantity` en vez de crear una entrada nueva.
- **Persistencia real en archivo**: cada operación de escritura (`addService`, `updateService`, `deleteService`, `createBooking`, `addServiceToBooking`) guarda el estado actualizado en su archivo `.json` correspondiente, para que los datos sobrevivan a un reinicio del servidor.

## Autora

Lu — [GitHub](https://github.com/Saide133)