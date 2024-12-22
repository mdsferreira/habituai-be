const { body } = require('express-validator');

// Middleware de validação
const validateHabit = [
    body('name')
        .isLength({ min: 3, max: 100 })
        .withMessage('The habit name must be between 3 and 100 characters long'),
    body('description')
        .optional()
        .isLength({ max: 255 })
        .withMessage('A descrição pode ter no máximo 255 caracteres'),
    body('frequency')
        .isIn(['daily', 'weekly', 'monthly'])
        .withMessage('Frequency must be one of "daily", "weekly", or "monthly"'),
    body('startDate')
        .isISO8601()
        .withMessage('A data de início deve ser uma data válida no formato ISO8601'),
];

module.exports = validateHabit;
