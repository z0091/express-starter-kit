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

router.post('/register', (req, res) => {
    const { name, password, username } = req.body;

    User
        .createNewUser(name, username, password)
        .then(() => {
            res.json({ message: 'ok' });
        })
        .catch(({ message }) => {
            res.status(400).json({ message });
        });
});

module.exports.routers = router;
