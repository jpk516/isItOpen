const express = require('express');
const router = express.Router();
const Venue = require('../models/venue');
const placesService = require('../services/places');
const base = '/api/places';

/**
* @openapi
* /api/places/hours/description/{description}:
*   get:
*       summary: Returns hours for a place
*       tags: [Places]
*       description: Returns all open time periods for a place. Description is a string containing the name and address of the place.
*       parameters:
*           - in: path
*             name: description
*             required: true
*             description: a string containing the name and address of the place
*       responses:
*           200:
*               description: list of open time periods
*               content:
*                   application/json:
*                       schema:
*                           type: array
* 
*/
router.get(`${base}/hours/:description`, async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            res.status(401).send("User is not authenticated")
            return
        }

        const hours = await placesService.getHours(req.params.description);
        res.json(hours);
    } catch (error) {
        res.status(500).json({ success: false, message: `Could not get hours: ${error}` });
    }
});

/**
* @openapi
* /api/places/hours/id/{id}:
*   get:
*       summary: Returns hours for a place
*       tags: [Places]
*       description: Returns all open time periods for a place. Uses the IIO venue Id of a location.
*       parameters:
*           - in: path
*             name: id
*             required: true
*             description: the IIO venue Id of a location
*       responses:
*           200:
*               description: list of open time periods
*               content:
*                   application/json:
*                       schema:
*                           type: array
* 
*/
router.get(`${base}/hours/id/:id`, async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            res.status(401).send("User is not authenticated")
            return
        }

        const venue = await Venue.findById(req.params.id);
        let friendlyNameAndAddress = `${venue?.name ?? ''} ${venue?.address ?? ''} ${venue?.city ?? ''} ${venue?.state ?? ''} ${venue?.zip ?? ''}`;

        const hours = await placesService.getHours(friendlyNameAndAddress);
        return res.json(hours);
    } catch (error) {
        res.status(500).json({ success: false, message: `Could not get hours: ${error}` });
    }
});

/**
* @openapi
* /api/places/open/description/{description}:
*   get:
*       summary: Returns if the location is currently open
*       tags: [Places]
*       description: Returns if the location is currently open. Description is a string containing the name and address of the place.
*       parameters:
*           - in: path
*             name: description
*             required: true
*             description: a string containing the name and address of the place
*       responses:
*           200:
*               description: boolean indicating if the place is open
*               content:
*                   application/json:
*                       schema:
*                           type: boolean
* 
*/
router.get(`${base}/open/description/:description`, async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            res.status(401).send("User is not authenticated")
            return
        }

        const openNow = await placesService.getOpenNow(req.params.description);
        res.json(openNow);
    } catch (error) {
        res.status(500).json({ success: false, message: `Could not get open now: ${error}` });
    }
});

/**
* @openapi
* /api/places/open/id/{id}:
*   get:
*       summary: Returns if the location is currently open
*       tags: [Places]
*       description: Returns if the location is currently open. Uses the IIO venue Id of a location.
*       parameters:
*           - in: path
*             name: id
*             required: true
*             description: the IIO venue Id of a location
*       responses:
*           200:
*               description: boolean indicating if the place is open
*               content:
*                   application/json:
*                       schema:
*                           type: boolean
* 
*/
router.get(`${base}/open/id/:id`, async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            res.status(401).send("User is not authenticated")
            return
        }

        const venue = await Venue.findById(req.params.id);
        let friendlyNameAndAddress = `${venue?.name ?? ''} ${venue?.address ?? ''} ${venue?.city ?? ''} ${venue?.state ?? ''} ${venue?.zip ?? ''}`;

        const openNow = await placesService.getOpenNow(friendlyNameAndAddress);
        return res.json(openNow);
    } catch (error) {
        res.status(500).json({ success: false, message: `Could not get open now: ${error}` });
    }
});

module.exports = router;
