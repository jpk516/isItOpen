const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const achievement = require('./achievement');

const User = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    role: { type: String, enum: ['Admin', 'User'], required: false, index: true },
    favorites: [{ 
        venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
    }],
    created: { type: Date, default: Date.now },
    disabled: { type: Boolean, default: false },
    achievements: [{
        achievement: { type: Schema.Types.ObjectId, ref: 'Achievement' },
        awarded: { type: Date, default: Date.now }
    }],
    token: String,
    tokenExpires: Date
});

// enforce unique venue favorites
User.index({ _id: 1, 'favorites.venue': 1 }, { unique: true });

// enforce unique token
User.index({ token: 1 }, { unique: true });

// enforce unique achievements
User.index({ _id: 1, 'achievements': 1 }, { unique: true });

// enforce unique email
User.index({ email: 1 }, { unique: true });

User.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
});

User.isAdmin = function() {
    return this.role === 'Admin';
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);