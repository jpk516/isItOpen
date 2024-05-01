// give users achievements if they meet certain criteria// Load all venues from the database and
// call the hours service to get updated hours.
const Venue = require("../models/venue");
const User = require("../models/user");
const CheckIn = require("../models/check-in");
const Achievement = require("../models/achievement");
const placesService = require('../services/places');

function processAchievements(hoursArray) {
   
}


const updateAll = async () => {
    let achievements = await Achievement.find();
    let users = await User.find().populate('achievements').exec();
    // go through each user and check if they have any achievements
    // that we need to award them

    console.log(`Checking ${users.length} users for achievements`);

    for (let user of users) {
        let checkins = await CheckIn.find({ user: user._id });

        for (let achievement of achievements) {
            if (achievement._id in user.achievements) {
                continue;
            }
            console.log(`Checking if user ${user.username} has achievement ${achievement.name}`);
            if (achievement.points <= checkins.length) {
                console.log(`Awarding achievement ${achievement.name} to user ${user.username}`);
                user.achievements.push({ achievement: achievement._id, awarded: new Date() });
            }
        }
    }

    await Promise.all(users.map(async user => {
        await user.save();
    }));
}

module.exports = (agenda) => {
    agenda.define('achievements', async (job, done) => {
        console.log('Giving Achievements...');
        await updateAll();
        done();
    });
}