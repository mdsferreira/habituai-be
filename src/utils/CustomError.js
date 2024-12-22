// utils/CustomError.js
class CustomError extends Error {
    constructor(message, status, details) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

module.exports = CustomError;
