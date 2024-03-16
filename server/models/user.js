const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email: String,
    firstName: String,
    middleName: String,
    lastName: String,
    phone: String,
    role: { type: String, enum: ['Admin', 'User'], required: false, index: true },
    // created: {
    //     type: Date,
    //     default: Date.now
    // }
});

User.isAdmin = function() {
    return this.role === 'Admin';
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);