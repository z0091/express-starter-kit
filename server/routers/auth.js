const express = require('express');
const Auth = require('../controllers/Auth');

const router = express.Router();

/**
 * Authentication
 */


router.post('/login', (req, res) => {
    Auth.loginUser(req.body, res);
});

router.post('/register', (req, res) => {
    Auth.registerUser(req.body, res);
});

module.exports = router;
