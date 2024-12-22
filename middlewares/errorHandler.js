// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro (apenas para depuração)

    // Configuração do status e da mensagem de erro
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

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
