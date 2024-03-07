const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./pointSchema');
const locationSchema = require('./locationSchema');


const Venue = new Schema({
    name: { type: String, unique: true, index: true, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    website: { type: String, required: false },
    image: { type: String, required: false },
    type: { type: String, enum: ['Bar', 'Restaurant', 'Music Venue', 'Other'], required: false, index: true },
    location: {
        type: locationSchema,
        required: true
    },
    geo: {
        type: pointSchema,
        // for now
        required: false,
        index: '2dsphere'
    },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Venue', Venue);