const path = require('path');
const packageInfo = require('../package.json');

module.exports = {
    version: packageInfo.version,
    name: packageInfo.name,
    release: false,
    verbose: false,
    hotWebpack: false,
    app: {
        assetsPath: path.resolve(__dirname, '../assets'),
        srcPath: path.resolve(__dirname, '../src'),
        serverPath: path.resolve(__dirname, '../server'),
        devtool: 'cheap-module-eval-source-map',
    },
    dist: {
        path: path.resolve(__dirname, '../dist'),
        devtool: '',
    },
    log: {
        dev: {
            level: 'info',
            usefiles: false,
            console: true,
        },
        prod: {
            level: 'info',
            usefiles: true,
            console: false,
        },
    },
    server: {
        port: '9987',
        host: '127.0.0.1',
    },
};
