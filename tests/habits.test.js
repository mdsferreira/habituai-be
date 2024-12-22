const request = require('supertest');
const { sequelize, User, Habit } = require('../models');
const { app, server } = require('../app'); // O arquivo principal da sua aplicação

describe('Habits API', () => {
    let token;

    // Configurar o ambiente de teste
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Resetar o banco de dados
        // Criar um usuário para autenticação
        const user = await User.create({
            email: 'test@example.com',
            password: 'password123',
        });

        // Obter um token de autenticação
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: user.email, password: 'password123' });

        token = response.body.token;
    });

    afterAll(async () => {
        await sequelize.close(); // Fechar conexão com o banco de dados
        server.close();
    });

    test('Should create a new habit', async () => {
        const habitData = {
            name: 'Exercise',
            description: 'Work out every morning',
            frequency: 'daily',
            startDate: '2024-01-01',
        };

        const response = await request(app)
            .post('/api/habits')
            .set('Authorization', `Bearer ${token}`)
            .send(habitData);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(habitData.name);
        expect(response.body.description).toBe(habitData.description);
        expect(response.body.frequency).toBe(habitData.frequency);
    });

    test('Should fetch all habits for the authenticated user', async () => {
        const response = await request(app)
            .get('/api/habits')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1); // Já criamos um hábito no teste anterior
        expect(response.body[0].name).toBe('Exercise');
    });

    test('Should return validation errors for invalid habit data', async () => {
        const invalidHabitData = {
            name: 'Ex',
            frequency: 'yearly', // Frequência inválida
        };

        const response = await request(app)
            .post('/api/habits')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidHabitData);

        expect(response.status).toBe(400);
        expect(response.body.error.message).toBe('Validation failed');
        expect(response.body.error.details).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ msg: 'The habit name must be between 3 and 100 characters long' }),
                expect.objectContaining({ msg: 'Frequency must be one of "daily", "weekly", or "monthly"' }),
            ])
        );
    });

    test('Should not create a habit without authentication', async () => {
        const habitData = {
            name: 'Meditate',
            description: 'Meditate every evening',
            frequency: 'daily',
            startDate: '2024-01-01',
        };

        const response = await request(app).post('/api/habits').send(habitData);

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Access denied. No token provided.');
    });
});
