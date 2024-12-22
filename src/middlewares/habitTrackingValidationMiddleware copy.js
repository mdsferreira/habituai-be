const { body } = require('express-validator');

// Middleware de validação
const validateHabitTracking = [
    body('trackingDate')
        .isISO8601()
        .withMessage('A data de rastreamento deve ser uma data válida no formato ISO8601'),
    body('isCompleted')
        .isBoolean()
        .withMessage('O campo isCompleted deve ser verdadeiro ou falso'),
];

module.exports = validateHabitTracking;
