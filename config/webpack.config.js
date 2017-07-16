const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');

const version = config.get('version');
const appName = config.get('name');
const srcPath = config.get('app:srcPath');
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

module.exports = {
    context: srcPath,
    resolve: {
        modules: [
            srcPath,
            'node_modules',
        ],
        alias: {},
    },
    output: {
        filename: `app-${version}-[hash]${isRelease ? '.min' : ''}.js`,
        path: distPath,
        publicPath: '/',
    },

    module: {
        noParse: [/handsontable.full.js/],
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /(node_modules)/,
            },
            { test: /\.hbs$/, use: ['handlebars-template-loader'] },
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
        extractLess,
        new webpack.ContextReplacementPlugin(/moment\/locale/, /en-gb/),
        new HtmlWebpackPlugin({
            app_name: appName,
            template: path.resolve(srcPath, 'index.html'),
            hash: false,
            version,
            api_prefix: config.get('app:apiPrefix'),
            printer_prefix: config.get('app:printerPrefix'),
            favicon: path.resolve(assetsPath, './img/favicon.png'),
            filename: 'index.html',
            inject: 'body',
        }),
        new webpack.ProvidePlugin({}),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: isDebug,
            minimize: isRelease,
        }),

        ...hotModuleReplacement ? [
            new webpack.HotModuleReplacementPlugin(),
        ] : [],

        ...isDebug ? [] : [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                },
            }),
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
        ],
    ],

    entry,
    devtool,
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
