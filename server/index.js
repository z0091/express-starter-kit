/* eslint-disable global-require */
/* global WEBPACK_BUNDLE */

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

const express = require('express');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const log4js = require('log4js');
const history = require('connect-history-api-fallback');

const bodyParserMiddleware = require('./middlewares/bodyParserMiddleware');
const dbConnection = require('./db');
const routers = require('./routers');
const config = require('../config/config');
const log = require('./log');

const port = config.get('server:port');
const host = config.get('server:host');
const apiPrefix = config.get('server:api');
const assetsPath = config.get('app:assetsPath');
const distPath = config.get('dist:path');
const isRelease = config.get('release');
const isDebug = !isRelease;

global.WEBPACK_BUNDLE = isRelease;

// Create app
const app = express();

app.use(log4js.connectLogger(log4js.getLogger('http')));
app.use(history({
    rewrites: [
        {
            from: new RegExp(`^${apiPrefix}(\\?|/.*|$)`),
            to: context => context.parsedUrl.pathname,
        },
    ],
}));

app.use(cookieParser());
app.use(compress()); // Apply gzip compression

app.use(bodyParserMiddleware.bodyParserJsonMiddleware());
app.use(bodyParserMiddleware.bodyParserUrlencodedMiddleware());
app.use('/assets', express.static(assetsPath));

app.use(apiPrefix, routers); // api

log.info(`Debug mode is ${isDebug}`);
log.info(`NODE_ENV: ${process.env.NODE_ENV}`);

async function startWebpack() {
    if (WEBPACK_BUNDLE) {
        app.use(express.static(distPath));
        await Promise.resolve(1);
    } else {
        // eslint-disable-next-line import/no-extraneous-dependencies
        const webpack = require('webpack')
        const webpackConfig = require('../config/webpack.app.conf');
        const compiler = webpack(webpackConfig);

        if (config.get('hotWebpack')) {
            log.info('Enable webpack [HRM] middleware');
            // eslint-disable-next-line import/no-extraneous-dependencies
            app.use(require('webpack-hot-middleware')(compiler));
        }

        // eslint-disable-next-line import/no-extraneous-dependencies
        const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath,
            stats: webpackConfig.stats,
        });

        app.use(webpackDevMiddleware);

        await new Promise((resolve) => {
            webpackDevMiddleware.waitUntilValid(resolve);
        });
    }
}

async function runServer() {
    const server = await app.listen(port, host);
    return server;
}

async function start() {
    await dbConnection();
    await startWebpack();
    const server = await runServer();

    log.info(`Server is running. Please open http://${host}:${port}/`);

    return server;
}

// Run server!!!
const ready = start();

module.exports = {
    ready,
};
