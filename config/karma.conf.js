/* eslint-disable global-require*/
process.env.NODE_ENV = 'test';

const path = require('path');
const config = require('./config');
const webpackConfig = require('./webpack.config');

const rootPath = path.join(__dirname, '../../');
const doVisual = config.get('onlyVisualTests');

module.exports = {
    basePath: '',
    files: [
        path.resolve(rootPath, './node_modules/babel-polyfill/dist/polyfill.js'),
        path.resolve(rootPath, './test/index.js'),
        path.resolve(rootPath, `./test/**/*.${doVisual ? 'visual' : 'spec'}.js`),
    ],

    // frameworks to use
    frameworks: ['mocha', 'sinon-chai'],

    preprocessors: {
        [path.resolve(rootPath, './test/index.js')]: ['webpack', 'sourcemap'],
        [path.resolve(rootPath, './test/**/*.spec.js')]: ['webpack', 'sourcemap'],
        [path.resolve(rootPath, './test/**/*.visual.js')]: ['webpack', 'sourcemap'],
    },

    reporters: ['mocha'],

    webpack: Object.assign({}, webpackConfig, { entry: '', devtool: 'eval' }),

    webpackMiddleware: {
        noInfo: true,
    },

    // reporter options
    mochaReporter: {
        showDiff: false,
    },

    junitReporter: {
        outputDir: process.env.JUNIT_REPORT_PATH,
        outputFile: process.env.JUNIT_REPORT_NAME,
        useBrowserName: false,
    },

    plugins: [
        require('karma-webpack'),
        require('karma-mocha'),
        require('karma-coverage'),
        require('karma-phantomjs-launcher'),
        require('karma-mocha-reporter'),
        require('karma-junit-reporter'),
        require('karma-sinon-chai'),
        require('karma-jquery-chai'),
        require('karma-sourcemap-loader'),
        require('karma-chrome-launcher'),
    ],

    browsers: ['PhantomJS'],
    browserNoActivityTimeout: 30000,
};
