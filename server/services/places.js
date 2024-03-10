const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const getHours = (placeName) => {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
  
    return fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        const placeId = data.candidates[0].place_id;
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&key=${apiKey}`;
  
        return fetch(detailsUrl)
          .then(response => response.json())
          .then(details => details.result.opening_hours.weekday_text)
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
  };
  
module.exports = placesService;
  