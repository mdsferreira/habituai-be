const sequelize = require('../../config/sequelize'); // Instância do Sequelize
const Habit = require('./habit')(sequelize); // Modelo de Habit
const HabitTracking = require('./habitTracking')(sequelize); // Modelo de HabitTracking
const User = require('./user')(sequelize); // Modelo de Habit

// Relacionamentos
Habit.hasMany(HabitTracking, { foreignKey: 'habitId', onDelete: 'CASCADE' });
HabitTracking.belongsTo(Habit, { foreignKey: 'habitId' });

module.exports = {
    sequelize,
    Habit,
    HabitTracking,
    User
};

