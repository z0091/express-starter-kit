const webpack = require('webpack');
const { serverConfig } = require('../config/webpack.config');

/**
 * Creates application bundles from the source files.
 */
function bundleServer() {
    return new Promise((resolve, reject) => {
        webpack(serverConfig).run((err, stats) => {
            if (err) {
                return reject(err);
            }

            console.log(stats.toString(serverConfig.stats));
            return resolve();
        });
    });
}

module.exports = bundleServer;
