const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');

/**
 * Creates application bundles from the source files.
 */
function bundle() {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig).run((err, stats) => {
            if (err) {
                return reject(err);
            }

            console.log(stats.toString(webpackConfig.stats));
            return resolve();
        });
    });
}

module.exports = bundle;
