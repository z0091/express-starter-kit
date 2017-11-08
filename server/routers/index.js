/*  eslint-disable no-unused-vars  */
const express = require('express');
const auth = require('./auth');

const router = express.Router();

module.exports = (passport) => {
    router.use(auth);

    router.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json('Success! You can not see this without a token');
    });

    router.get('/', (req, res) => {
        res.json({ message: 'hi' });
    });

    return router;
};
