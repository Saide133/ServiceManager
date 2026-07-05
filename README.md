# ServiceManager - Sistema de Turnos y Reservas

Proyecto Node.js con ESM que implementa un administrador de servicios para un gimnasio.

## Tecnologías
- Node.js v24
- Express
- Dotenv

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Crear el archivo `.env` basándose en `.env.example`:
PORT=8080
NODE_ENV=development

## Ejecución

Modo desarrollo:
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| PORT | Puerto del servidor | 8080 |
| NODE_ENV | Entorno de ejecución | development |

## Recurso: Services

Cada servicio tiene la siguiente estructura:

```json
{
    "id": "1",
    "name": "Clase de Yoga",
    "description": "Clase grupal de yoga para todos los niveles",
    "duration": 60,
    "price": 500,
    "category": "mente y cuerpo",
    "available": true
}
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /services | Obtener todos los servicios |
| GET | /services/:id | Obtener un servicio por id |
| POST | /services | Crear un servicio nuevo |
| PUT | /services/:id | Modificar un servicio |
| DELETE | /services/:id | Eliminar un servicio |

## Ejemplos de uso

**Crear un servicio (POST /services):**
```json
{
    "name": "Zumba",
    "description": "Clase de baile fitness de alta energía",
    "duration": 50,
    "price": 450,
    "category": "cardio",
    "available": true
}
```

**Modificar un servicio (PUT /services/1):**
```json
{
    "price": 650
}
```