const express = require('express');
const Categories = require('../controllers/Categories');


const router = express.Router();

router.get('/', (req, res, next) => {
    Categories.getList(req.query, res, next);
});

router.post('/', (req, res, next) => {
    Categories.create(req.body, res, next);
});

module.exports = router;
