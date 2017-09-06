const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const eslintFormatter = require('eslint-friendly-formatter');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const config = require('./config');

const version = config.get('version');
const appName = config.get('name');
const srcPath = config.get('app:srcPath');
const serverPath = config.get('app:serverPath');
const assetsPath = config.get('app:assetsPath');
const distPath = config.get('dist:path');
const isRelease = config.get('release');
const isDebug = !isRelease;
const isVerbose = config.get('verbose');
const hotModuleReplacement = config.get('hotWebpack') && isDebug;
const devtool = isDebug ? config.get('app:devtool') : config.get('dist:devtool');

const entry = [
    ...hotModuleReplacement ? ['webpack-hot-middleware/client?reload=true'] : [],
    path.resolve(srcPath, 'less/styles.less'),
    'babel-polyfill', path.resolve(srcPath, 'index.js'),
];

const extractLess = new ExtractTextPlugin({
    filename: `css/[name]-${version}-[hash].css`,
    disable: isDebug,
});

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const webpackConfig = {
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

const appConfig = {
    ...webpackConfig,
    context: srcPath,

    target: 'web',

    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: eslintFormatter,
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    },
                    extractCSS: true,
                },
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /(\.css|\.less)$/,
                use: extractLess.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: isDebug,
                            modules: false,
                            minimize: isRelease,
                        },
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isDebug,
                        },
                    }],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.txt$/,
                use: ['raw-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: isDebug ? 'assets/img/[name].[ext]?[hash]' : 'assets/img/[hash].[ext]',
                    limit: 10000,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: isDebug ? 'assets/fonts/[name].[ext]?[hash]' : 'assets/fonts/[hash].[ext]',
                },
            },
        ],
    },

    plugins: [
        ...webpackConfig.plugins,
        extractLess,
        new webpack.ContextReplacementPlugin(/moment\/locale/, /en-gb/),
        new HtmlWebpackPlugin({
            app_name: appName,
            template: path.resolve(srcPath, 'index.html'),
            hash: false,
            version,
            favicon: path.resolve(assetsPath, './img/favicon.png'),
            filename: 'index.html',
            inject: 'body',
        }),
        new webpack.ProvidePlugin({}),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDebug ? '"development"' : '"production"',
            },
        }),

        ...hotModuleReplacement ? [
            new webpack.HotModuleReplacementPlugin(),
        ] : [],

        ...isDebug ? [] : [
            new CopyWebpackPlugin([
                {
                    context: assetsPath,
                    from: '**/*',
                    to: 'assets/',
                },
                {
                    from: './robots.txt',
                },
            ]),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    screw_ie8: true,
                    warnings: isVerbose,
                },
            }),
            new OptimizeCSSPlugin({
                cssProcessorOptions: {
                    safe: true,
                },
            }),
        ],
    ],

    entry,
    devtool,

};

const testConfig = {
    ...appConfig,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"testing"',
                BABEL_ENV: '"test"',
            },
        }),
    ],

    entry: '',
    devtool: '#inline-source-map',
};

const serverConfig = {
    ...webpackConfig,
    target: 'node',

    resolve: {
        ...webpackConfig.resolve,
    },

    externals: [nodeExternals()],

    output: {
        ...webpackConfig.output,
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
        ...webpackConfig.plugins,
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
};

module.exports = {
    appConfig,
    serverConfig,
    testConfig,
};
