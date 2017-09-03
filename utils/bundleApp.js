const webpack = require('webpack');
const { appConfig } = require('../config/webpack.config');

/**
 * Creates application bundles from the source files.
 */
function bundleApp() {
    return new Promise((resolve, reject) => {
        webpack(appConfig).run((err, stats) => {
            if (err) {
                return reject(err);
            }

            console.log(stats.toString(appConfig.stats));
            return resolve();
        });
    });
}

module.exports = bundleApp;
