const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckIn = new Schema({
    venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: false },
    // do we want ratings?
    rating: { type: Number, required: false },
    open: { type: Boolean, default: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CheckIn', CheckIn);