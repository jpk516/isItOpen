// Load all venues from the database and
// call the hours service to get updated hours.
const Venue = require("../models/venue");
const placesService = require('../services/places');

function processSchedule(hoursArray) {
    const placeholderDate = '2024-01-01';
  
    return hoursArray.map((entry, index) => {
        const [day, times] = entry.split(': ');
        const [startTime, endTime] = times.split(' - ');

        // Create Date objects for start and end times. Adjust index (day of week) appropriately if needed.
        // Note: JavaScript counts months from 0, so January is month 0.
        const startDate = new Date(`${placeholderDate} ${startTime} GMT-0000`);
        startDate.setDate(startDate.getDate() + index); // Adjust the day based on the index

        const endDate = new Date(`${placeholderDate} ${endTime} GMT-0000`);
        endDate.setDate(endDate.getDate() + index); // Adjust the day based on the index

        return {
            day,
            startTime: startDate,
            endTime: endDate
        };
    });
  }

const updateAll = async () => {
    let venues = await Venue.find();
    let updatedVenues = await Promise.all(venues.map(async venue => {
        try {
            let hours = await placesService.getHours(venue.name);
            venue.hours = processSchedule(hours);

        } catch (error) {
            console.error(`Failed to update hours for ${venue.name}: ${error}`);
        }
        return venue;
    }));

    await Promise.all(updatedVenues.map(async venue => {
        await venue.save();
    }));
}
