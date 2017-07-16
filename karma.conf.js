/* eslint-disable global-require*/

const conf = require('./config/karma.conf');

module.exports = (config) => {
    config.set(conf);
};
