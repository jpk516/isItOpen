const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckIn = new Schema({
    venue: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: false },
    open: { type: Boolean, required: false },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CheckIn', CheckIn);