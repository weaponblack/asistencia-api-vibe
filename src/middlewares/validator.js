
const { body, validationResult } = require('express-validator');

const validateStudent = [
  body('name')
    .if(body('name').exists())
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isString(),
  body('code')
    .if((req) => req.method === 'POST')
    .matches(/^EST\d{5}$/)
    .withMessage('El código debe tener el formato EST seguido de 5 dígitos (ej: EST00001)'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }
    next();
  },
];

const validateAttendance = [
  body('studentCode')
    .if((req) => req.method === 'POST')
    .matches(/^EST\d{5}$/)
    .withMessage('Código de estudiante inválido'),
  body('status')
    .optional()
    .isIn(['presente', 'ausente', 'justificada'])
    .withMessage('El estado debe ser: presente, ausente o justificada'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('La fecha debe ser un formato ISO8601 válido (YYYY-MM-DD)'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateStudent,
  validateAttendance,
};
