const sequelize = require('../config/sequelize'); // Instância do Sequelize
const Habit = require('../src/models/habit')(sequelize); // Modelo de Habit
const HabitTracking = require('../src/models/habitTracking')(sequelize); // Modelo de HabitTracking
const User = require('../src/models/user')(sequelize); // Modelo de Habit

// Relacionamentos
Habit.hasMany(HabitTracking, { foreignKey: 'habitId', onDelete: 'CASCADE' });
HabitTracking.belongsTo(Habit, { foreignKey: 'habitId' });

module.exports = {
  sequelize,
  Habit,
  HabitTracking,
  User
};

