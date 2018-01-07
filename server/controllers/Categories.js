const mongoose = require('mongoose');

const Category = mongoose.model('Category');

module.exports.getList = (params, res, next) => {
    Category
        .find({})
        .populate('children')
        .exec()
        .then((data) => {
            res.json({
                message: 'ok',
                data,
            });
        })
        .catch(next);
};

module.exports.create = (params, res, next) => {
    const category = new Category(params);

    category
        .save()
        .then((data) => {
            res.json({ message: 'ok', data });
        })
        .catch(next);
};
