// Load all venues from the database and
// call the hours service to get updated hours.
const Venue = require("../models/venue");
const placesService = require('../services/places');

function processSchedule(hoursArray) {
    const placeholderDate = '2000-01-01';
  
    return hoursArray.map((entry, index) => {
        const [day, times] = entry.split(': ');

        // Check if the day is marked as 'Closed'
        if (times === 'Closed') {
            return {
                day,
                open: null,
                close: null,
            };
        }

        const [startTimeString, endTimeString] = times.split(' – ');
        // Combine the standard date with the provided times to create Date objects
        console.log(`Processing ${day} with ${startTimeString} - ${endTimeString}`);
        const startTime = new Date(`${placeholderDate} ${startTimeString}`);
        const endTime = new Date(`${placeholderDate} ${endTimeString}`);

        // Adjust for cases where end time is past midnight
        if (endTime <= startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }
        return {
            day,
            open: startTime,
            close: endTime
        };
    });
}


const updateAll = async () => {
    let venues = await Venue.find();
    let updatedVenues = await Promise.all(venues.map(async venue => {
        try {
            let hours = await placesService.getHours(venue.name);
            venue.hours = processSchedule(hours);
            console.log(`Updated hours for ${venue.name} to ${JSON.stringify(venue.hours)}`);
        } catch (error) {
            console.error(`Failed to update hours for ${venue.name}: ${error}`);
        }
        return venue;
    }));

    await Promise.all(updatedVenues.map(async venue => {
        await venue.save();
    }));
}

module.exports = (agenda) => {
    agenda.define('update hours', async (job, done) => {
        console.log('Updating hours...');
        await updateAll();
        done();
    });
}