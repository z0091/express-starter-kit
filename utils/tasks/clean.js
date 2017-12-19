const { cleanDir } = require('../lib/fs');
const config = require('../../config/config');

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
    await cleanDir(config.get('dist:path'), {
        nosort: true,
        dot: true,
        ignore: [],
    });
}

module.exports = clean;
