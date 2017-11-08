const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../../config/config');

const secret = config.get('server:secret');
const mongoose = require('mongoose');

const User = mongoose.model('User');


router.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    User
        .checkByLoginAndPassword(name, password)
        .then((user) => {
            const payload = { id: user._id };
            const token = jwt.sign(payload, secret);
            res.json({ message: 'ok', token });
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


module.exports = router;
