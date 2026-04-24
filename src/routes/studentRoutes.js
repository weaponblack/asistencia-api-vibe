
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudent } = require('../middlewares/validator');

router.post('/', validateStudent, studentController.createStudent);
router.get('/', studentController.getStudents);
router.put('/:code', studentController.updateStudent);
router.delete('/:code', studentController.deleteStudent);

module.exports = router;
