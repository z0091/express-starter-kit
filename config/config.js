const nconf = require('nconf');
const path = require('path');
const defaultConf = require('./default.conf');

nconf
    .use('memory')
    .env()
    .argv()
    .file(path.resolve(__dirname, '../local.conf.json'))
    .defaults(defaultConf);

if (process.env.NODE_ENV) {
    nconf.set('release', process.env.NODE_ENV === 'production');
}

module.exports = nconf;
