const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const config = require('./config');

const serverPath = config.get('app:serverPath');
const isRelease = config.get('release');
const isDebug = !isRelease;
const isVerbose = config.get('verbose');

module.exports = merge(baseConfig, {
    target: 'node',

    externals: [nodeExternals()],

    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDebug ? '"development"' : '"production"',
                BROWSER: false,
            },
            WEBPACK_BUNDLE: true,
            __DEV__: isDebug,
        }),

        ...isDebug ? [] : [
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                mangle: true,
                compress: {
                    warnings: isVerbose,
                },
            }),
        ],
    ],

    entry: path.resolve(serverPath, 'index.js'),

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
});
