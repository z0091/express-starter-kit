const webpack = require('webpack');
const path = require('path');
const config = require('./config');

const version = config.get('version');
const srcPath = config.get('app:srcPath');
const distPath = config.get('dist:path');
const isRelease = config.get('release');
const isDebug = !isRelease;
const isVerbose = config.get('verbose');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            srcPath,
            'node_modules',
        ],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        },
    },
    output: {
        filename: `[name]-${version}-[hash]${isRelease ? '.min' : ''}.js`,
        path: distPath,
        publicPath: '/',
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: isDebug,
            minimize: isRelease,
        }),
    ],

    cache: isDebug,

    stats: {
        colors: true,
        modules: isVerbose,
        reasons: isDebug,
        hash: isVerbose,
        version: isVerbose,
        timings: true,
        chunks: isVerbose,
        chunkModules: isVerbose,
        cached: isVerbose,
        cachedAssets: isVerbose,
    },
};
