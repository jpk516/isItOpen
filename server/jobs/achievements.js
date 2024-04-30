// give users achievements if they meet certain criteria// Load all venues from the database and
// call the hours service to get updated hours.
const Venue = require("../models/venue");
const User = require("../models/user");
const Achievement = require("../models/achievement");
const placesService = require('../services/places');

function processAchievements(hoursArray) {
   
}


const updateAll = async () => {
    let users = await User.find();
    let achievements = await Achievement.find();
    // go through each user and check if they have any achievements
    // that we need to award them

    for (let user of users) {
        for (let achievement of achievements) {
            if (achievement._id in user.achievements) {
                continue;
            }
            console.log(`Checking if user ${user.username} has achievement ${achievement.name}`);
        }
    }



    // let venues = await Venue.find();
    // let updatedVenues = await Promise.all(venues.map(async venue => {
    //     try {
    //         let hours = await placesService.getHours(venue.name);
    //         venue.hours = processSchedule(hours);
    //         console.log(`Updated hours for ${venue.name} to ${JSON.stringify(venue.hours)}`);
    //     } catch (error) {
    //         console.error(`Failed to update hours for ${venue.name}: ${error}`);
    //     }
    //     return venue;
    // }));

    // await Promise.all(updatedVenues.map(async venue => {
    //     await venue.save();
    // }));
}

module.exports = (agenda) => {
    agenda.define('achievements', async (job, done) => {
        console.log('Giving Achievements...');
        await updateAll();
        done();
    });
}