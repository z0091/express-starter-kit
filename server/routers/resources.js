/*  eslint-disable no-unused-vars  */
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json('Success! You can not see this without a token');
});

module.exports = router;
