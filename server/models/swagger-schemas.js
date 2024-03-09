const m2s = require('mongoose-to-swagger');
const tag = require('./tag');
const checkIn = require('./check-in');
const venue = require('./venue');
const user = require('./user');

module.exports = {
    Tag: m2s(tag),
    CheckIn: m2s(checkIn),
    Venue: m2s(venue),
    User: m2s(user),
    ActionResult: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
        }
    }
};