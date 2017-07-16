import { cleanDir } from './lib/fs';
import config from '../config/config';

/**
 * Cleans up the output (build) directory.
 */
export default function clean() {
    return Promise.all([
        cleanDir(config.get('dist:path'), {
            nosort: true,
            dot: true,
            ignore: [],
        }),
    ]);
}
