
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { validateAttendance } = require('../middlewares/validator');

router.get('/', attendanceController.getAttendances);
router.post('/', validateAttendance, attendanceController.registerAttendance);
router.put('/:id', validateAttendance, attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);
router.get('/reporte-ausentismo', attendanceController.getAbsenteeismReport);

module.exports = router;
