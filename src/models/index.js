const sequelize = require('../../config/sequelize'); // Instância do Sequelize
const Habit = require('./Habit')(sequelize); // Modelo de Habit
const HabitTracking = require('./HabitTracking')(sequelize); // Modelo de HabitTracking
const User = require('./User')(sequelize); // Modelo de Habit

// Relacionamentos
Habit.hasMany(HabitTracking, { foreignKey: 'habitId', onDelete: 'CASCADE' });
HabitTracking.belongsTo(Habit, { foreignKey: 'habitId' });

module.exports = {
    sequelize,
    Habit,
    HabitTracking,
    User
};

