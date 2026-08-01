# Sistema Backend de Turnos y Reservas

API REST construida con Express, organizada en arquitectura de capas, para gestionar dos recursos: **servicios** disponibles para reservar turnos, y **reservas** creadas por los clientes.

Este proyecto es la quinta entrega del curso Backend de Coderhouse, y refactoriza la API anterior incorporando capas de `service`, `repository` y `DAO` entre los controllers y la persistencia en archivos.

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
npm start
```

O, para reiniciar automáticamente en cada cambio durante desarrollo:

```bash
npm run dev
```

El servidor va a estar disponible en `http://localhost:8080`.

## Arquitectura en capas

El proyecto sigue un flujo de 5 capas, donde cada una tiene una única responsabilidad y solo se comunica con la capa inmediatamente adyacente:

```
Router → Controller → Service → Repository → DAO → archivo JSON
```

| Capa | Responsabilidad | Ejemplo de archivo |
|---|---|---|
| **Router** | Define los endpoints y los conecta con su controller. No contiene lógica. | `services.router.js` |
| **Controller** | Lee `req.params`, `req.query` y `req.body`; llama al service; responde con `res.status().json()`. No conoce reglas de negocio. | `services.controller.js` |
| **Service** | Contiene las reglas de negocio (validaciones de campos obligatorios, protección de campos como `id`, lógica de `quantity` en reservas). No conoce `req`/`res`. | `services.service.js` |
| **Repository** | Ofrece métodos de acceso a datos genéricos (`getAll`, `getById`, `create`, `update`, `delete`), sin reglas de negocio. Es responsable de armar la entidad completa antes de persistirla (genera el `id`, valores por defecto). | `services.repository.js` |
| **DAO** | Lee y escribe directamente en el archivo JSON correspondiente. No contiene lógica de negocio ni sabe nada de HTTP. | `services.dao.js` |

**¿Por qué separar en tantas capas?** Cada capa puede cambiar sin afectar a las demás. El ejemplo más claro es la persistencia: hoy el DAO lee y escribe archivos `.json` con `fs`, pero cuando el proyecto migre a MongoDB (próxima etapa del curso), solo va a ser necesario reemplazar el DAO por una versión que hable con Mongoose — el Router, el Controller, el Service y el Repository no necesitan modificarse, porque nunca dependieron de cómo se guardan los datos.

### Inyección de dependencias

Cada Repository recibe su DAO como parámetro en el constructor, en vez de crearlo internamente:

```js
const dao = new ServiceDAO()
const repository = new ServiceRepository(dao)
```

Esto permite reemplazar la implementación del DAO sin modificar el código del Repository.

### Regla de negocio destacada: `quantity` en reservas

Si un mismo servicio se agrega más de una vez a una reserva, en vez de duplicar la entrada, se incrementa su `quantity`. Esta regla vive en `bookings.service.js`, no en el DAO ni en el Repository, porque es lógica de negocio, no de acceso a datos.

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
| POST | `/api/bookings` | Crea una reserva (`services` es opcional, arranca en `[]`; `status` inicia en `"pending"`) | 201 / 400 |
| GET | `/api/bookings/:bid` | Devuelve una reserva por id | 200 / 404 |
| POST | `/api/bookings/:bid/services/:sid` | Agrega un servicio a una reserva, validando que ambos existan. Si el servicio ya estaba, incrementa `quantity` | 200 / 404 |
| PUT | `/api/bookings/:bid` | Actualiza una reserva existente (no permite modificar el `id`) | 200 / 404 |
| DELETE | `/api/bookings/:bid` | Elimina una reserva por id | 200 / 404 |

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
    "date": "2026-08-05",
    "time": "15:00"
}
```

## Estructura del proyecto

```
src/
  config/env.config.js           → configuración de entorno con dotenv
  routes/
    services.router.js           → endpoints de servicios
    bookings.router.js           → endpoints de reservas
  controllers/
    services.controller.js       → maneja req/res de servicios
    bookings.controller.js       → maneja req/res de reservas
  services/
    services.service.js          → reglas de negocio de servicios
    bookings.service.js          → reglas de negocio de reservas
  repositories/
    services.repository.js       → acceso a datos genérico de servicios
    bookings.repository.js       → acceso a datos genérico de reservas
  dao/
    services.dao.js              → lectura/escritura de services.json
    bookings.dao.js              → lectura/escritura de bookings.json
  data/
    services.json                → datos de servicios
    bookings.json                → datos de reservas
  app.js                         → configuración de Express (middlewares, rutas)
  server.js                      → arranque del servidor
```

## Decisiones de diseño

- **Generación de `id` con `crypto.randomUUID()`**: se decide en el Repository, ya que es responsable de armar la entidad completa antes de persistirla. Evita colisiones al eliminar y crear elementos, a diferencia de un cálculo basado en `length`.
- **Valores por defecto en el Repository**: campos que el sistema asigna siempre (como `status: 'pending'` o `services: []` en una reserva nueva) se resuelven en el Repository, junto al `id` — no son reglas de negocio variables, son parte de cómo se arma la entidad.
- **El Service de bookings depende del Service de services, no de su Repository**: `bookings.service.js` valida la existencia de un servicio llamando a `getServiceById` desde `services.service.js`, respetando que cada capa se comunique con su capa equivalente en otro dominio.
- **Persistencia real en archivo**: cada operación de escritura guarda el estado actualizado en su archivo `.json` correspondiente, para que los datos sobrevivan a un reinicio del servidor.

## Autora

Lu — [GitHub](https://github.com/Saide133)