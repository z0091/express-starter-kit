const nconf = require('nconf');
const path = require('path');
const defaultConf = require('./default.conf');

nconf
    .use('memory')
    .env()
    .argv()
    .file(path.resolve(__dirname, '../local.conf.json'))
    .defaults(defaultConf);

module.exports = nconf;
