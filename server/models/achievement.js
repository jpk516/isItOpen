const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Achievement = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true, default: 0},
    created: { type: Date, default: Date.now }
});