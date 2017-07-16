import run from './run';
import clean from './clean';
import bundle from './bundle';
import bundleServer from './bundle.server';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
    await run(clean);
    await run(bundle);
    await run(bundleServer);
}

module.exports = build;
