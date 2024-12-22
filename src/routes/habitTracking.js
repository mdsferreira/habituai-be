const express = require('express');
const { HabitTracking, Habit } = require('../models');
const validateHabitTracking = require('../middlewares/habitTrackingValidationMiddleware copy');
const { validationResult } = require('express-validator');
const CustomError = require('../utils/CustomError');

const router = express.Router();

// Marcar um hábito como concluído
router.post('/:habitId/track', validateHabitTracking, async (req, res, next) => {
  try {
    const { habitId } = req.params;
    const { trackingDate, isCompleted } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Validation failed', 400, errors.array());
    }

    const habit = await Habit.findByPk(habitId);
    if (!habit) {
      throw new CustomError('Habit not found', 404, errors.array());
    }

    const tracking = await HabitTracking.create({
      habitId,
      trackingDate,
      isCompleted,
    });

    res.status(201).json(tracking);
  } catch (error) {
    next(error);
  }
});

// Buscar histórico de rastreamento de um hábito
router.get('/:habitId/track', async (req, res, next) => {
  try {
    const { habitId } = req.params;

    const trackingHistory = await HabitTracking.findAll({ where: { habitId } });

    res.status(200).json(trackingHistory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
