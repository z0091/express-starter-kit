const run = require('../run');
const clean = require('./clean');
const copy = require('./copy');
const bundleApp = require('./bundleApp');
const bundleServer = require('./bundleServer');

/**
 * Compiles the project = require(source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
    await run(clean);
    await run(copy);
    await run(bundleApp);
    await run(bundleServer);
}

module.exports = build;
