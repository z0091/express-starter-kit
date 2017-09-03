import { writeFile, copyFile, makeDir } from './lib/fs';
import pkg from '../package.json';
import config from '../config/config';

const distPath = config.get('dist:path');

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
    await makeDir(distPath);
    await Promise.all([
        writeFile(
            `${distPath}/package.json`,
            JSON.stringify(
                {
                    private: true,
                    engines: pkg.engines,
                    dependencies: pkg.dependencies,
                    scripts: {
                        start: 'node server.js',
                    },
                },
                null,
                2,
            ),
        ),
        copyFile('LICENSE', `${distPath}/LICENSE.txt`),
        copyFile('package-lock.json', `${distPath}/package-lock.json`),
    ]);
}

export default copy;
