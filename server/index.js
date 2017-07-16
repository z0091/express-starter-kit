/* eslint-disable global-require*/

require('babel-polyfill');
const express = require('express');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const log4js = require('log4js');
const history = require('connect-history-api-fallback');

const bodyParserMiddleware = require('./middlewares/bodyParserMiddleware');
const routers = require('./routers');
const config = require('../config/config');
const log = require('../config/log');

const port = config.get('server:port');
const host = config.get('server:host');
const assetsPath = config.get('app:assetsPath');
const distPath = config.get('dist:path');
const isDebug = !config.get('release');
const hotModuleReplacement = config.get('hotWebpack');

// Create app
const app = express();

app.use(log4js.connectLogger(log.http));
app.use(history());

app.use(cookieParser());
app.use(compress()); // Apply gzip compression

app.use(bodyParserMiddleware.bodyParserJsonMiddleware());
app.use(bodyParserMiddleware.bodyParserUrlencodedMiddleware());
app.use('/assets', express.static(assetsPath));

if (isDebug) {
    const webpack = require('webpack');
    const webpackConfig = require('../config/webpack.config');
    const compiler = webpack(webpackConfig);

    log.info('Debug mode is true');
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: webpackConfig.stats,
    }));
    if (hotModuleReplacement) {
        log.info('Enable webpack [HRM] middleware');
        app.use(require('webpack-hot-middleware')(compiler));
    }
} else {
    app.use(express.static(distPath));
}

app.use('/', routers(config, log.api));

// And run the server
app.listen(port, host, () => {
    log.info(`Server is running. Please open http://${host}:${port}/`);
});
