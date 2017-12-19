#!/usr/bin/env node
/* eslint-disable global-require */
/**
 * Helps to launch other scripts with babel-node
 * e.g. node tools/run build
 */

const path = require('path');

const TASKS_DIR = './tasks';


function format(time) {
    return time.toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function run(fn, options) {
    const task = typeof fn.default === 'undefined' ? fn : fn.default;
    const start = new Date();

    console.log(`[${format(start)}] Starting '${task.name}${options ? ` (${options})` : ''}'...`);

    return task(options)
        .then((resolution) => {
            const end = new Date();
            const time = end.getTime() - start.getTime();

            console.log(`[${format(end)}] Finished '${task.name}${options ? ` (${options})` : ''}' after ${time} ms`);

            return resolution;
        });
}

if (require.main === module && process.argv.length > 2) {
    delete require.cache[__filename];
    const path_module = path.join(__dirname, TASKS_DIR, `/${process.argv[2]}.js`);
    const task_module = require(path_module); // eslint-disable-line import/no-dynamic-require
    run(task_module)
        .catch((err) => {
            console.error(err.stack);
            process.exit(1);
        });
}

module.exports = run;
