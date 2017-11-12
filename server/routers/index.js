/*  eslint-disable no-unused-vars  */
const express = require('express');
const auth = require('./auth');

const router = express.Router();

router.use(auth.routers);

router.get('/secret', auth.checkAuthMiddleware('user'), (req, res) => {
    res.json('Success! You can not see this without a token');
});

router.get('/', (req, res) => {
    res.json({ message: 'hi' });
});

module.exports = router;
