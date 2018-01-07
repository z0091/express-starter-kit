const express = require('express');
const errorMiddleware = require('../middlewares/errorMiddleware');
const { checkAuthMiddleware } = require('../middlewares/checkAuthMiddleware');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/admin', checkAuthMiddleware('user'), require('./admin'));
router.use('/resources', require('./resources'));
router.use('/categories', require('./categories'));

// Should be last
router.use(errorMiddleware);

module.exports = router;
