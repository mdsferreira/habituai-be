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
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const habits = await Habit.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.json({
            total: habits.count,
            page,
            habits: habits.rows,
        });
    } catch (err) {
        next(err);
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
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Habit.destroy({ where: { id } });

        if (!deleted) {
            throw new CustomError('Habit not found', 404);
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
