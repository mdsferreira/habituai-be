const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HabitTracking = sequelize.define('HabitTracking', {
    habitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'O habitId é obrigatório' },
        isInt: { msg: 'O habitId deve ser um número inteiro' },
      },
    },
    trackingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: 'A data de rastreamento é obrigatória' },
        isDate: { msg: 'A data de rastreamento deve ser válida' },
      },
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'O campo isCompleted é obrigatório' },
        isIn: {
          args: [[true, false]],
          msg: 'O campo isCompleted deve ser verdadeiro ou falso',
        },
      },
    },
  });

  return HabitTracking;
};
