const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Venue = new Schema({
    name: { type: String, unique: true, index: true, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Venue', Venue);