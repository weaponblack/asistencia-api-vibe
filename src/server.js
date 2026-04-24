
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Endpoints disponibles:');
  console.log(`- GET    /api/estudiantes`);
  console.log(`- POST   /api/estudiantes`);
  console.log(`- PUT    /api/estudiantes/:code`);
  console.log(`- DELETE /api/estudiantes/:code`);
  console.log(`- GET    /api/asistencia`);
  console.log(`- POST   /api/asistencia`);
  console.log(`- PUT    /api/asistencia/:id`);
  console.log(`- DELETE /api/asistencia/:id`);
  console.log(`- GET    /api/asistencia/reporte-ausentismo`);
});
