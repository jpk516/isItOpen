const m2s = require('mongoose-to-swagger');
const tag = require('./tag');
const checkIn = require('./check-in');
const venue = require('./venue');
const user = require('./user');
const achievement = require('./achievement');

module.exports = {
    Tag: m2s(tag),
    CheckIn: m2s(checkIn),
    Venue: m2s(venue),
    User: m2s(user),
    Achievement: m2s(achievement),
    ActionResult: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
        }
    }
};