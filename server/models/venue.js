const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./pointSchema');

const Venue = new Schema({
    name: { type: String, unique: true, index: true, required: true },
    google_place_id: { type: String, required: false },
    description: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    website: { type: String, required: false },
    image: { type: String, required: false },
    type: { type: String, enum: ['Bar', 'Restaurant', 'Music Venue', 'Other'], required: false, index: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    geo: {
        type: pointSchema,
        // for now
        required: false,
        index: '2dsphere'
    },
    hours: { 
        type: [{
            day: { type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
            open: { type: Date },
            close: { type: Date }
        }],
        required: false
     },
    active: { type: Boolean, default: true, required: true, index: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Venue', Venue);