const log = require('../log');

const error404 = (req, res) => {
    res.status(404).json({ code: 404, message: 'Not found' });
};

/**
 * @example
 * res.status(400);
 * throw new Error('Random error');
 */
const error = (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
    } else {
        const code = err.status || res.statusCode || 500;
        const message = err.message || 'Error 500';

        if (code === 500) log.app.error(`Internal error(${code}): ${message}`);
        res.status(code).json({ code, message });
    }
};

module.exports = [error404, error];
