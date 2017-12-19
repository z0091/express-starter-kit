const webpack = require('webpack');
const merge = require('webpack-merge');
const appConfig = require('./webpack.app.conf');

module.exports = merge.strategy({
    plugins: 'prepend',
})(appConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"testing"',
                BABEL_ENV: '"test"',
            },
        }),
    ],

    resolveLoader: {
        alias: {
            // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
            // see discussion at https://github.com/vuejs/vue-loader/issues/724
            'scss-loader': 'sass-loader',
        },
    },


    entry: '',
    devtool: '#inline-source-map',
});
