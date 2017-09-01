import run from './run';
import clean from './clean';
import bundleApp from './bundleApp';
import bundleServer from './bundleServer';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
    await run(clean);
    await run(bundleApp);
    await run(bundleServer);
}

module.exports = build;
