const m2s = require('mongoose-to-swagger');
const tag = require('./tag');
const checkIn = require('./check-in');
const venue = require('./venue');
const user = require('./user');

module.exports = {
    tag: m2s(tag),
    checkIn: m2s(checkIn),
    venue: m2s(venue),
    user: m2s(user),
};