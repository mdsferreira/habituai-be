const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Habit = sequelize.define('Habit', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'O userId é obrigatório' },
        isInt: { msg: 'O userId deve ser um número inteiro' },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'O nome do hábito é obrigatório' },
        len: { args: [3, 100], msg: 'O nome deve ter entre 3 e 100 caracteres' },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [0, 255], msg: 'A descrição pode ter no máximo 255 caracteres' },
      },
    },
    frequency: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
      allowNull: false,
      validate: {
        notNull: { msg: 'A frequência é obrigatória' },
        isIn: {
          args: [['daily', 'weekly', 'monthly']],
          msg: 'A frequência deve ser "daily", "weekly" ou "monthly"',
        },
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'A data de início é obrigatória' },
        isDate: { msg: 'A data de início deve ser válida' },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return Habit;
};
