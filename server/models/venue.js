const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Venue = new Schema({
    name: { type: String, unique: true, index: true, required: true },
    description: { type: String, required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    website: { type: String, required: false },
    image: { type: String, required: false },
    type: { type: String, required: false },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Venue', Venue);