/* eslint-disable global-require */
/* global WEBPACK_BUNDLE */

require('babel-polyfill');
const express = require('express');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const log4js = require('log4js');
const history = require('connect-history-api-fallback');

const bodyParserMiddleware = require('./middlewares/bodyParserMiddleware');
const routers = require('./routers');
const config = require('../config/config');
const log = require('./log');

const port = config.get('server:port');
const host = config.get('server:host');
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
            from: /^\/api(\?|\/.*|$)/,
            to: '/api',
        },
    ],
}));

app.use(cookieParser());
app.use(compress()); // Apply gzip compression

app.use(bodyParserMiddleware.bodyParserJsonMiddleware());
app.use(bodyParserMiddleware.bodyParserUrlencodedMiddleware());
app.use('/assets', express.static(assetsPath));

log.info(`Debug mode is ${isDebug}`);
log.info(`NODE_ENV: ${process.env.NODE_ENV}`);

if (WEBPACK_BUNDLE) {
    app.use(express.static(distPath));
} else {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const webpack = require('webpack');
    const webpackConfig = require('../config/webpack.config').appConfig;
    const compiler = webpack(webpackConfig);

    // eslint-disable-next-line import/no-extraneous-dependencies
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: webpackConfig.stats,
    }));
    if (config.get('hotWebpack')) {
        log.info('Enable webpack [HRM] middleware');
        // eslint-disable-next-line import/no-extraneous-dependencies
        app.use(require('webpack-hot-middleware')(compiler));
    }
}

app.use('/', routers(config, log.api));

// And run the server
app.listen(port, host, () => {
    log.info(`Server is running. Please open http://${host}:${port}/`);
});
