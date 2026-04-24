
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/estudiantes', studentRoutes);
app.use('/api/asistencia', attendanceRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API de Asistencia Estudiantil en funcionamiento' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Algo salió mal en el servidor' });
});

module.exports = app;
