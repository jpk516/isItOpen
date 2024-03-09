const express = require('express');
const router = express.Router();
const base = '/api/tests';

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

module.exports = router;