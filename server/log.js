const log4js = require('log4js');
const config = require('../config/config');

const isDebug = !config.get('release');
const logConf = config.get(`log:${isDebug ? 'dev' : 'prod'}`);
const levelLog = logConf.level;
const useConsole = logConf.console;
const useFiles = logConf.usefiles;

log4js.configure({
    appenders: {
        console: { type: 'console' },
        ...useFiles ? {
            file: {
                type: 'file',
                filename: 'log/app-dev.log',
                maxLogSize: 10485760,
                numBackups: 3,
            },
            fileApi: {
                type: 'file',
                filename: 'log/api-dev.log',
                maxLogSize: 10485760,
                numBackups: 3,
            },
        } : {},
    },
    categories: {
        api: {
            appenders: [
                ...useConsole ? ['console'] : [],
                ...useFiles ? ['fileApi'] : [],
            ],
            level: levelLog,
        },
        default: {
            appenders: [
                ...useConsole ? ['console'] : [],
                ...useFiles ? ['file'] : [],
            ],
            level: levelLog,
        },
    },
});

const logger = log4js.getLogger('app');
console.log = logger.info.bind(logger);

module.exports = logger;
module.exports.api = log4js.getLogger('api');
module.exports.http = log4js.getLogger('http');
