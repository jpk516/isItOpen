const express = require('express');
const router = express.Router();
const base = '/api/tests';
const hoursService = require('../jobs/hours');
const placesService = require('../services/places');

/**
* @openapi
* /api/tests:
*   get:
*       summary: Test controller function
*       tags: [Tests]
*       description: Current test controller function
*       responses:
*           200:
*               description: Who knows what this will return
* 
*/
router.get(base, (req, res) => {
    hoursService.updateAll();
    return res.json({ message: "Test controller function" });
});


/**
* @openapi
* /api/tests/hours/{name}:
*   get:
*       summary: Test getting hours for a place by name
*       tags: [Tests]
*       description: Test getting hours for a place by name
*       parameters:
*           - in: path
*             name: name
*             required: true
*             description: The venue name
*       responses:
*           200:
*               description: Who knows what this will return
* 
*/
router.get(`${base}/hours/:name`, (req, res) => {
    placesService.getHours(req.params.name)
        .then(hours => res.json(hours))
        .catch(err => res.json({ success: false, message: "Could not load hours: " + err }));
});


/**
* @openapi
* /api/tests/places:
*   get:
*       summary: test getting nearby places
*       tags: [Tests]
*       description: test getting nearby places
*       responses:
*           200:
*               description: Who knows what this will return
* 
*/
router.get(`${base}/places`, (req, res) => {
    placesService.getNearbyPlaces({ lat: 38.9517, lng: -92.3341 }, 15000, 'bar')
        .then(places => res.json(places))
        .catch(err => res.json({ success: false, message: "Could not load places: " + err }));
});

module.exports = router;