const express = require('express');
const { Habit } = require('../models');
const validateHabit = require('../middlewares/habitValidationMiddleware');
const authMiddleware = require('../middlewares/auth');
const { validationResult } = require('express-validator');
const CustomError = require('../utils/CustomError');

const router = express.Router();

// Criar um novo hábito
router.post('/', authMiddleware, validateHabit, async (req, res, next) => {
    try {
        const { name, description, frequency, startDate } = req.body;
        const { userId } = req;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError('Validation failed', 400, errors.array());
        }
        // Criar o hábito
        const habit = await Habit.create({
            userId: Number(userId),
            name,
            description,
            frequency,
            startDate,
        });

        res.status(201).json(habit);
    } catch (error) {
        next(error);
    }
});

// Listar todos os hábitos de um usuário
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const { userId } = req;
        const habits = await Habit.findAll({ where: { userId } });
        res.status(200).json(habits);
    } catch (error) {
        next(error);
    }
});

// Atualizar um hábito
router.put('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, frequency, startDate, isActive } = req.body;

        const habit = await Habit.findByPk(id);

        if (!habit) {
            throw new CustomError('Habit not found', 404, errors.array());
        }

        await habit.update({ name, description, frequency, startDate, isActive });

        res.status(200).json(habit);
    } catch (error) {
        next(error);
    }
});

// Excluir um hábito
router.delete('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;

        const habit = await Habit.findByPk(id);

        if (!habit) {
            throw new CustomError('Habit not found', 404, errors.array());
        }

        await habit.destroy();

        res.status(204).send(); // No content
    } catch (error) {
        next(error);
    }
});

module.exports = router;