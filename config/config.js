const nconf = require('nconf');
const path = require('path');
const defaultConf = require('./default.conf');

nconf
    .use('memory')
    .env()
    .argv()
    .file(path.resolve(__dirname, '../local.conf.json'))
    .defaults(defaultConf);

if (nconf.get('NODE_ENV') === undefined) {
    const NODE_ENV = nconf.get('release') ? 'production' : 'development';
    process.env.NODE_ENV = NODE_ENV;
    nconf.set('NODE_ENV', NODE_ENV);
} else {
    nconf.set('release', nconf.get('NODE_ENV') === 'production');
}

module.exports = nconf;
