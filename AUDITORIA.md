# Auditoría de Seguridad y Código - Asistencia API

## Hallazgo 1 — Validación de código del estudiante
- **Severidad:** baja (positiva)
- **Archivo/línea:** `src/middlewares/validator.js`, líneas 11 y 25
- **Descripción:** Se valida correctamente que el código del estudiante cumpla con el patrón `EST` seguido de 5 dígitos.
- **Evidencia:** Uso de `.matches(/^EST\d{5}$/)` en los validadores de estudiante y asistencia.
- **Impacto:** Asegura la integridad de los datos de identificación.

## Hallazgo 2 — Validación de fechas futuras
- **Severidad:** media
- **Archivo/línea:** `src/middlewares/validator.js`, línea 31
- **Descripción:** No existe una validación que impida registrar asistencias con fechas en el futuro.
- **Evidencia:** El validador `body('date').isISO8601()` solo verifica el formato, no el valor cronológico.
- **Impacto:** Permite la creación de registros de asistencia inválidos para fechas que aún no han ocurrido.

## Hallazgo 3 — Manejo de errores y códigos HTTP
- **Severidad:** media
- **Archivo/línea:** `src/controllers/studentController.js`, línea 10
- **Descripción:** Se utilizan códigos HTTP genéricos (400) para conflictos de datos (código duplicado) en lugar de códigos más específicos (409 Conflict). Además, los controladores carecen de bloques `try/catch` locales.
- **Evidencia:** `return res.status(400).json({ status: 'error', message: 'El código de estudiante ya existe' });`
- **Impacto:** Semántica de API deficiente y riesgo de falta de control sobre excepciones específicas en operaciones asíncronas futuras.

## Hallazgo 4 — Inyección y Rate Limiting
- **Severidad:** alta
- **Archivo/línea:** `src/app.js`
- **Descripción:** La aplicación no cuenta con protección contra ataques de denegación de servicio (DoS) o fuerza bruta mediante Rate Limiting.
- **Evidencia:** No se encuentra el middleware `express-rate-limit` ni configuraciones similares en `app.js`.
- **Impacto:** El servidor es vulnerable a saturación por múltiples peticiones malintencionadas.

## Hallazgo 5 — Exposición de datos sensibles (Autenticación)
- **Severidad:** alta
- **Archivo/línea:** `src/app.js`, líneas 16-17
- **Descripción:** No se implementó ningún mecanismo de autenticación o autorización para proteger los datos de los estudiantes y sus asistencias.
- **Evidencia:** Las rutas se exponen directamente con `app.use` sin middlewares de seguridad intermedios.
- **Impacto:** Cualquier usuario con acceso a la red puede consultar, crear, modificar o eliminar datos personales de estudiantes (Habeas Data en riesgo).

## Hallazgo 6 — Estructura y Mantenibilidad
- **Severidad:** baja (positiva)
- **Archivo/línea:** Carpeta `src/`
- **Descripción:** El código está bien organizado siguiendo una estructura de separación de responsabilidades clara.
- **Evidencia:** Separación en `routes`, `controllers`, `models` y `middlewares`.
- **Impacto:** Facilita la escalabilidad y el mantenimiento del código por otros desarrolladores.

## Hallazgo 7 — Vulnerabilidades de Dependencias
- **Severidad:** baja (positiva)
- **Archivo/línea:** `package.json`
- **Descripción:** No se detectaron vulnerabilidades conocidas en las dependencias instaladas.
- **Evidencia:** Resultado de `npm audit` indica "found 0 vulnerabilities".
- **Impacto:** Reduce la superficie de ataque por fallos conocidos en bibliotecas de terceros.

## Hallazgo 8 — Configuración de entorno (.env.example)
- **Severidad:** baja
- **Archivo/línea:** Raíz del proyecto
- **Descripción:** Falta el archivo `.env.example` para documentar las variables de entorno necesarias para el despliegue.
- **Evidencia:** Solo existe el archivo `.env` (que no debería subirse al repositorio).
- **Impacto:** Dificulta la configuración inicial del proyecto para nuevos desarrolladores.

## Hallazgo 9 — Idempotencia y duplicados en asistencia
- **Severidad:** media
- **Archivo/línea:** `src/controllers/attendanceController.js`, línea 4
- **Descripción:** Es posible registrar la asistencia del mismo estudiante varias veces para la misma fecha.
- **Evidencia:** La función `registerAttendance` no valida si ya existe un registro previo para ese `studentCode` y `date`.
- **Impacto:** Inconsistencia en los reportes de ausentismo y duplicidad innecesaria de datos.

## Hallazgo 10 — Pruebas automatizadas
- **Severidad:** alta
- **Archivo/línea:** `package.json`, línea 8
- **Descripción:** No se han implementado pruebas automatizadas para validar la lógica de negocio.
- **Evidencia:** El script de test está vacío y no existen archivos de pruebas en el repositorio.
- **Impacto:** Incapacidad de asegurar que cambios futuros no rompan la funcionalidad existente (riesgo de regresión).
