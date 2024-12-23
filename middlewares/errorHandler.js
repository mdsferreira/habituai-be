const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro (apenas para depuração)

    // Configuração do status e da mensagem de erro
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    logger.error(`Error: ${err.message}`);

    // Resposta do erro
    res.status(statusCode).json({
        error: {
            statusCode,
            message,
            details: err.details || ""
        },
    });
};

module.exports = errorHandler;
