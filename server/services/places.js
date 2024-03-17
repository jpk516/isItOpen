const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const placeTypes = process.env.PLACE_TYPES || 'restaurant|night_club|cafe|bar|bakery|bowling_alley|casino|movie_theater';

const getNearbyPlaces = (location, radius) => {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${placeTypes}&key=${apiKey}`;
  
    return fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        const places = data.results;
        return places;
      })
      .catch(err => {
        console.error('Error fetching nearby places:', err);
        throw err;
      });
};

const getHours = (placeName) => {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
  
    return fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        const placeId = data.candidates[0].place_id;
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

        return fetch(detailsUrl)
          .then(response => response.json())
          .then(details => {
            console.log(details);
            //console.log(details?.result?.opening_hours?.isOpen())
            const hours = details?.result?.opening_hours?.weekday_text ?? [];
            return hours;
          })
          .catch(err => {
            console.error('Error fetching place details:', err);
            throw err;
          });
      })
      .catch(err => {
        console.error('Error fetching place ID:', err);
        throw err;
      });
  };
  
  const getReviews = (placeName) => {
    // This is a placeholder for the actual implementation
    return `Fetching reviews for ${placeName} using API key ${apiKey}`;
  };
  
  const placesService = {
    getHours,
    getReviews,
    getNearbyPlaces
  };
  
module.exports = placesService;
  