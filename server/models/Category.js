/* eslint-disable func-names */

const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Category Schema
 */
const CategorySchema = new Schema({
    title: {
        type: Schema.Types.String,
        require: true,
    },
    alias: {
        type: Schema.Types.String,
        require: true,
        unique: true,
    },
    menuindex: {
        type: Schema.Types.Number,
        default: 0,
    },
    content: {
        type: Schema.Types.String,
        default: '',
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
}, {
    toJSON: { virtuals: true },
});

/**
 * Virtuals
 */
CategorySchema
    .virtual('children', {
        ref: 'Category',
        localField: '_id',
        foreignField: 'parent',
        justOne: false,
    });

/**
 * Validations
 */


module.exports = mongoose.model('Category', CategorySchema);
