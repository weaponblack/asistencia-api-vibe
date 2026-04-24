
const { students, attendances } = require('../models/data');

const registerAttendance = (req, res) => {
  const { studentCode, status, date } = req.body;

  // Verificar que el estudiante exista
  const student = students.find(s => s.code === studentCode);
  if (!student) {
    return res.status(404).json({ status: 'error', message: 'Estudiante no encontrado' });
  }

  // Registrar asistencia
  const newAttendance = {
    id: attendances.length + 1,
    studentCode,
    studentName: student.name,
    status, // presente, ausente, justificada (validado en middleware)
    date: date || new Date().toISOString().split('T')[0],
    registeredAt: new Date()
  };

  attendances.push(newAttendance);

  res.status(201).json({ status: 'success', data: newAttendance });
};

const getAbsenteeismReport = (req, res) => {
  const report = students.map(student => {
    const studentAttendances = attendances.filter(a => a.studentCode === student.code);
    const absences = studentAttendances.filter(a => a.status === 'ausente').length;
    const totalRecords = studentAttendances.length;
    const absenteeismRate = totalRecords > 0 ? (absences / totalRecords) * 100 : 0;

    return {
      studentCode: student.code,
      studentName: student.name,
      totalRecords,
      absences,
      absenteeismRate: `${absenteeismRate.toFixed(2)}%`
    };
  });

  res.json({ status: 'success', data: report });
};

const getAttendances = (req, res) => {
  res.json({ status: 'success', data: attendances });
};

const deleteAttendance = (req, res) => {
  const { id } = req.params;
  const index = attendances.findIndex(a => a.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Registro de asistencia no encontrado' });
  }

  const deleted = attendances.splice(index, 1);
  res.json({ status: 'success', message: 'Registro eliminado', data: deleted[0] });
};

const updateAttendance = (req, res) => {
  const { id } = req.params;
  const { status, date } = req.body;
  const attendance = attendances.find(a => a.id === parseInt(id));

  if (!attendance) {
    return res.status(404).json({ status: 'error', message: 'Registro no encontrado' });
  }

  if (status) attendance.status = status;
  if (date) attendance.date = date;

  res.json({ status: 'success', data: attendance });
};

module.exports = {
  registerAttendance,
  getAttendances,
  updateAttendance,
  deleteAttendance,
  getAbsenteeismReport,
};
