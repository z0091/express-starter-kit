const log4js = require('log4js');
const config = require('./config');

const isDebug = !config.get('release');
const logConf = config.get(`log:${isDebug ? 'dev' : 'prod'}`);

log4js.configure({
    replaceConsole: logConf.replaceConsole,
    levels: {
        '[all]': logConf.level,
    },
    appenders: [
        {
            type: 'clustered',
            appenders: [
                ...logConf.console ? [{ type: 'console' }] : [],
                ...logConf.usefiles && logConf.files ? logConf.files : [],
            ],
        },
    ],
});

module.exports = log4js.getLogger('app');
module.exports.api = log4js.getLogger('api');
module.exports.http = log4js.getLogger('http');
