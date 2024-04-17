const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckIn = new Schema({
    venue: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: false },
    open: { type: Boolean, required: false },
    tags: [{type: String, required: false}],
    created: { type: Date, default: Date.now },
    upvoteCount: { type: Number, default: 0 },
    downvoteCount: { type: Number, default: 0 },
    votes: [{
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        up: { type: Boolean, required: true },
        created: { type: Date, default: Date.now }
    }],
    hidden: { type: Boolean, default: false }
});

// enfore unique user votes per check-in
CheckIn.index({ _id: 1, 'votes.user': 1 }, { unique: true });

module.exports = mongoose.model('CheckIn', CheckIn);