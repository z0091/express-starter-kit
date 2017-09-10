const mongoose = require('mongoose');
const config = require('../config/config');
const log = require('./log');

require('./models');

const { uri, options } = config.get('db');

mongoose.Promise = Promise;

/**
 * @return Promise
 */
module.exports = () => {
    // Create db connection
    mongoose.connect(uri, {
        useMongoClient: true,
        ...options,
    });

    return mongoose.connection
        .then(() => {
            log.info('Successful connection to mongodb');
            return mongoose;
        })
        .catch((err) => {
            log.error('Mongodb connection error:', err.message);
            process.exit(1);
        });
};
