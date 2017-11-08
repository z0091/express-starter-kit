const log4js = require('log4js');
const config = require('../config/config');

const isDebug = !config.get('release');
const _prefix = isDebug ? 'dev' : 'prod';
const logConf = config.get(`log:${_prefix}`);
const levelLog = logConf.level;
const useConsole = logConf.console;
const useFiles = logConf.usefiles;

log4js.configure({
    appenders: {
        console: { type: 'console' },
        ...useFiles ? {
            file: {
                type: 'file',
                filename: `log/app-${_prefix}.log`,
                maxLogSize: 10485760,
                numBackups: 3,
            },
            fileApi: {
                type: 'file',
                filename: `log/api-${_prefix}.log`,
                maxLogSize: 10485760,
                numBackups: 3,
            },
            fileDB: {
                type: 'file',
                filename: `log/db-${_prefix}.log`,
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
        db: {
            appenders: [
                ...useConsole ? ['console'] : [],
                ...useFiles ? ['fileDB'] : [],
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
module.exports.app = logger;
module.exports.api = log4js.getLogger('api');
module.exports.http = log4js.getLogger('http');
module.exports.db = log4js.getLogger('db');
