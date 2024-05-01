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
    },
    VenueSelectList: {
        type: 'object',
        properties: {
            _id: { type: 'string' },
            name: { type: 'string' }
        }
    },
    AuthenticatedResult: {
        type: 'object',
        properties: {
            authenticated: { type: 'boolean' },
            message: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
            isAdmin: { type: 'boolean' }
        }
    },
    Vote: {
        type: 'object',
        properties: {
            up: { type: 'boolean' },
        }
    },
    UserVoteStatus: {
        type: 'object',
        properties: {
            voted: { type: 'boolean' },
            up: { type: 'boolean' }
        }
    },
    CheckInWithUserVoteStatus: {
        type: 'object',
        properties: {
            checkIn: { $ref: '#/components/schemas/CheckIn' },
            userVoteStatus: { $ref: '#/components/schemas/UserVoteStatus' },
        }
    },
    Description: {
        type: 'object',
        properties: {
            description: { type: 'string' }
        }
    },
};