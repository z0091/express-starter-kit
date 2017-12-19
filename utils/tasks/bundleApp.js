const webpack = require('webpack');
const chalk = require('chalk');
const appConfig = require('../../config/webpack.app.conf');

const { NODE_ENV } = process.env;
const nameBuild = 'app';

/**
 * Creates application bundles from the source files.
 */
async function bundleApp() {
    await new Promise((resolve, reject) => {
        webpack(appConfig).run((err, stats) => {
            if (err) return reject(err);

            console.log(`\n${chalk.green(`Build ${nameBuild} for ${NODE_ENV}.`)}`);
            console.log(`${stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            })}\n\n`);
            console.log(chalk.cyan('  Build complete.\n'));

            return resolve();
        });
    });
}

module.exports = bundleApp;
