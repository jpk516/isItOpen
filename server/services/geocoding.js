const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({});


// take in an address and return the lat and long
const getGeo = async (address) => {
    try {
        console.log("address", address)
        const response = await client.geocode({
            params: {
                address: address,
                key: process.env.GOOGLE_MAPS_API_KEY
            }
        });
        return response.data.results[0].geometry.location
    } catch (error) {
        console.error(error);
    }
}

const getGeoFromVenue = async (venue) => {
    const address = `${venue.address}, ${venue.city}, ${venue.state} ${venue.zip}`
    const res = await getGeo(address)
    return {type: 'Point', coordinates: [res.lng, res.lat]}
}

module.exports = {
    getGeo,
    getGeoFromVenue
}