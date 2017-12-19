const mongoose = require('mongoose');
const jwt = require('../passport/JWT');
const log = require('../log');

const User = mongoose.model('User');

module.exports.loginUser = ({ name, password }, res) => {
    // TODO Ограничение числа попыток аунтификации
    User
        .checkByLoginAndPassword(name, password)
        .then((user) => {
            jwt.sign(user._id)
                .then((token) => {
                    res.json({ message: 'ok', token });
                })
                .catch((error) => {
                    log.app.error(`JWT ${error}`);
                    throw new Error();
                });
        })
        .catch(() => {
            res.status(401);
            throw new Error('Invalid user or password');
        });
};

module.exports.registerUser = ({ name, password, username }, res) => {
    User
        .createNewUser(name, username, password)
        .then(() => {
            res.json({ message: 'ok' });
        })
        .catch(({ message }) => {
            res.status(400);
            throw new Error(message);
        });
};
