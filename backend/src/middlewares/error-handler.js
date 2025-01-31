const logger = require('../config/logger')

const errorHandler = (err, req, res, next) => {
    logger.error('Error', {
        message: err.message,
        stack: err.stack,
        path: req.path
    });

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? 'Internal Server Error' : err.message 
    });
};