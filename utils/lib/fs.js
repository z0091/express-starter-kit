const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

module.exports.readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => (err ? reject(err) : resolve(data)));
});

module.exports.writeFile = (file, contents) => new Promise((resolve, reject) => {
    fs.writeFile(file, contents, 'utf8', err => (err ? reject(err) : resolve()));
});

module.exports.copyFile = (source, target) => new Promise((resolve, reject) => {
    let cbCalled = false;
    function done(err) {
        if (!cbCalled) {
            cbCalled = true;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        }
    }

    const rd = fs.createReadStream(source);
    rd.on('error', err => done(err));
    const wr = fs.createWriteStream(target);
    wr.on('error', err => done(err));
    wr.on('close', err => done(err));
    rd.pipe(wr);
});

module.exports.readDir = (pattern, options) => new Promise((resolve, reject) =>
    glob(pattern, options, (err, result) => (err ? reject(err) : resolve(result))));

module.exports.makeDir = name => new Promise((resolve, reject) => {
    mkdirp(name, err => (err ? reject(err) : resolve()));
});

module.exports.copyDir = async (source, target) => {
    const dirs = await readDir('**/*.*', {
        cwd: source,
        nosort: true,
        dot: true,
    });

    await Promise.all(dirs.map(async (dir) => {
        const from = path.resolve(source, dir);
        const to = path.resolve(target, dir);
        await makeDir(path.dirname(to));
        await copyFile(from, to);
    }));
};

module.exports.cleanDir = (pattern, options) => new Promise((resolve, reject) =>
    rimraf(pattern, { glob: options }, (err, result) => (err ? reject(err) : resolve(result))));
