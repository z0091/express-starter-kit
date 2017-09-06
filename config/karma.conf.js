/* eslint-disable global-require */

const path = require('path');
const webpackConfig = require('./webpack.config').testConfig;

const rootPath = path.join(__dirname, '../test/unit');

module.exports = {
    files: [
        path.resolve(rootPath, './index.js'),
    ],

    // frameworks to use
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],

    preprocessors: {
        [path.resolve(rootPath, './index.js')]: ['webpack', 'sourcemap'],
    },

    reporters: ['mocha'],

    webpack: webpackConfig,

    webpackMiddleware: {
        noInfo: true,
    },

    // reporter options
    mochaReporter: {
        showDiff: false,
    },

    browsers: ['PhantomJS'],
    browserNoActivityTimeout: 30000,
};
