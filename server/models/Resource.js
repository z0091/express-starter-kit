/* eslint-disable func-names */

const mongoose = require('mongoose');

const { Schema } = mongoose;


/**
 * Resource Schema
 */
const ResourceSchema = new Schema({
    article: { type: String, unique: true, required: true },
    description: { type: String, default: '' },
    total_area: { type: Number, default: 0 },
    living_area: { type: Number, default: 0 },
    building_area: { type: Number, default: 0 },
    total_volume: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    type_foundation: { type: String, default: '' },
    type_exterior_walls: { type: String, default: '' },
    type_interior_walls: { type: String, default: '' },
    type_floor: { type: String, default: '' },
    type_roof: { type: String, default: '' },
    createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resource', ResourceSchema);
