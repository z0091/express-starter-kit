const express = require('express');

const jwt = require('../passport/JWT');
const log = require('../log');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const router = express.Router();

/**
 * Authentication
 */
router.post('/login', (req, res) => {
    const { name, password } = req.body;

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
                    res.status(500).json('Error 500');
                });
        })
        .catch(() => res.status(401).json({ message: 'Invalid user or password' }));
});


router.post('logout', (req, res) => {
    res.status(200).json({ message: 'ok' });
});

router.post('logout', (req, res) => {
    res.status(200).json({ message: 'ok' });
});

router.post('register', (req, res) => {
    res.status(200).json({ message: 'ok' });
});


module.exports.routers = router;

/**
 * Return route middleware to authorization
 * @param role - user roles Eg: "urn:foo", /urn:f[o]{2}/, [/urn:f[o]{2}/, "urn:bar"]
 * @return {Function}
 */
module.exports.checkAuthMiddleware = role => (req, res, next) => {
    const token = req.body.token || req.headers.jwt;

    if (token) {
        jwt.verify(token, role)
            .then((decoded) => {
                req.jwt = decoded;
                next();
            })
            .catch((error) => {
                log.app.error(`Verify JWT ${error}`);
                res.status(401).json({ message: 'Invalid authorization' });
            });
    } else {
        res.status(401).json({ message: 'Invalid authorization' });
    }
};
