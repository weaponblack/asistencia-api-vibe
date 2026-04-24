
const { students } = require('../models/data');

const createStudent = (req, res) => {
  const { name, code } = req.body;

  // El validador en las rutas se encargará del formato ESTxxxxx
  const existingStudent = students.find(s => s.code === code);
  if (existingStudent) {
    return res.status(400).json({ status: 'error', message: 'El código de estudiante ya existe' });
  }

  const newStudent = { id: students.length + 1, name, code, createdAt: new Date() };
  students.push(newStudent);

  res.status(201).json({ status: 'success', data: newStudent });
};

const getStudents = (req, res) => {
  res.json({ status: 'success', data: students });
};

const updateStudent = (req, res) => {
  const { code } = req.params;
  const { name } = req.body;
  const student = students.find(s => s.code === code);

  if (!student) {
    return res.status(404).json({ status: 'error', message: 'Estudiante no encontrado' });
  }

  if (name) student.name = name;
  res.json({ status: 'success', data: student });
};

const deleteStudent = (req, res) => {
  const { code } = req.params;
  const index = students.findIndex(s => s.code === code);

  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Estudiante no encontrado' });
  }

  const deleted = students.splice(index, 1);
  res.json({ status: 'success', message: 'Estudiante eliminado', data: deleted[0] });
};

module.exports = {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
