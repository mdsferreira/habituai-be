const habitRoutes = require('./src/routes/habits');
const habitTrackingRoutes = require('./src/routes/habitTracking');

// Rotas de hábitos
app.use('/api/habits', habitRoutes);

// Rotas de rastreamento de hábitos
app.use('/api/habit-tracking', habitTrackingRoutes);