const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Importa a conexão com o banco
const habitRoutes = require('./src/routes/habits');
const habitTrackingRoutes = require('./src/routes/habitTracking');
const authRoutes = require('./src/routes/auth');
const errorHandler = require('./middlewares/errorHandler'); // Importar o middleware de erro

const app = express();
const PORT = process.env.NODE_ENV === "test" ? 3001 : process.env.PORT || 8000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Habits API',
            version: '1.0.0',
            description: 'API for managing habits',
        },
    },
    apis: ['./routes/*.js'], // Caminho para as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// Middleware para parsing de JSON
app.use(bodyParser.json());

// Teste de conexão
sequelize
    .authenticate()
    .then(() => console.log('Conexão com o banco bem-sucedida!'))
    .catch((err) => console.error('Erro ao conectar ao banco:', err));

app.use('/api/habits', habitRoutes);
app.use('/api/habit-tracking', habitTrackingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

// Endpoint inicial para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('API de Gestão de Hábitos está rodando!');
});

// Iniciar o servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, server }
