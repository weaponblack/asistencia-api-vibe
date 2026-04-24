# API de Asistencia Estudiantil

Esta es una API REST desarrollada con Node.js y Express para gestionar la asistencia de estudiantes.

## Requisitos
- Node.js (v18 o superior recomendado)
- npm

## Instalación
```bash
npm install
```

## Ejecución
```bash
npm start
```
El servidor correrá en `http://localhost:3000`.

## Endpoints

### Estudiantes
- **LISTAR**: `GET /api/estudiantes`
- **CREAR**: `POST /api/estudiantes`
- **ACTUALIZAR**: `PUT /api/estudiantes/:code`
- **ELIMINAR**: `DELETE /api/estudiantes/:code`
  ```json
  // Ejemplo Crear/Actualizar
  {
    "name": "Juan Pérez",
    "code": "EST00001"
  }
  ```

### Asistencia
- **LISTAR REGISTROS**: `GET /api/asistencia`
- **REGISTRAR**: `POST /api/asistencia`
- **ACTUALIZAR**: `PUT /api/asistencia/:id`
- **ELIMINAR**: `DELETE /api/asistencia/:id`
  ```json
  // Ejemplo Registrar/Actualizar
  {
    "studentCode": "EST00001",
    "status": "presente",
    "date": "2023-10-27"
  }
  ```
  *Estados permitidos: `presente`, `ausente`, `justificada`.*

- **REPORTE DE AUSENTISMO**: `GET /api/asistencia/reporte-ausentismo`
  Genera un listado de estudiantes con su total de registros, inasistencias y tasa de ausentismo.

## Estructura del Proyecto
- `src/controllers`: Lógica de negocio y manejo de peticiones.
- `src/models`: Estructuras de datos (almacenamiento en memoria para esta versión).
- `src/routes`: Definición de los puntos de acceso de la API.
- `src/middlewares`: Validaciones de formato y lógica de entrada.
- `src/app.js`: Configuración de Express.
- `src/server.js`: Punto de entrada del servidor.
