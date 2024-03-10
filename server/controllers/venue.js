const express = require('express')
const router = express.Router()
const passport = require('passport');
const Venue = require("../models/venue");
const base = '/api/venues'
const { getGeoFromVenue } = require('../services/geocoding');
const { add } = require('../models/pointSchema');

// TODO: add roles / auth to routes
//       We don't need to call the geo service if the address hasn't changed

/**
* @openapi
* /api/venues:
*   get:
*       summary: Returns all venues
*       tags: [Venues]
*       description: Returns all venues
*       responses:
*           200:
*               description: A list of venues
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Venues'
* 
*/
router.get(base, (req, res) => {
    Venue.find({})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => res.json({ success: false, message: "Could not load venues: " + err }));
});

/**
* @openapi
* /api/venues/select-list:
*   get:
*       summary: Returns all venues in a select list format
*       tags: [Venues]
*       description: Returns all venues in a select list format
*       responses:
*           200:
*               description: A list of venues in select list format
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Venues'
* 
*/
router.get(`${base}/select-list`, (req, res) => {
    Venue.find({}).select('name')
        .then((result) => {
            res.json(result)
        })
        .catch((err) => res.json({ success: false, message: "Could not load venues: " + err }));
});

/**
* @openapi
* /api/venues/count:
*   get:
*       summary: Returns count of all venues
*       tags: [Venues]
*       description: Returns count of all venues
*       responses:
*           200:
*               description: Count of all venues
*               content:
*                   application/json:
*                       schema:
*                           type: integer
* 
*/
router.get(`${base}/count`, (req, res) => {
    Venue.estimatedDocumentCount()
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load counts: " + err }));
});

/**
* @openapi
* /api/venues/{name}:
*   get:
*       summary: Returns a venue by name
*       tags: [Check-Ins]
*       description: Returns a venue by name
*       parameters:
*           - in: path
*             name: name
*             required: true
*             description: The venue name
*       responses:
*           200:
*               description: A venue by name
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Venue'
* 
*/
router.get(`${base}/:name`, (req, res) => {
    if (req.isAuthenticated()) {
        Venue.find({name: req.params.name})
            .then((result) => res.json(result[0]))
            .catch((err) => res.json({ success: false, message: "Could not load venue. Error: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

/**
* @openapi
* /api/venues:
*   post:
*       summary: Creates a new venue
*       tags: [Venues]
*       description: Creates a new venue and geocodes the address
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Venue'
*       responses:
*           200:
*               description: The created venue
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Venue'
*           401:
*               description: User is not authenticated
*           500:
*               description: Internal server error
*/
router.post(base, (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated")
        return
    }
    const newVenue = new Venue(req.body)
    getGeoFromVenue(newVenue).then((geo) => {
        newVenue.geo = geo
        newVenue.save()
        .then((result) => res.json(result))
        .catch((err) => {
            if (err.code === 11000) {
                res.status(500).send("A venue with that name already exists")
            } else {
                res.status(500).send(err.message)
            }
        });
    });
});

/**
* @openapi
* /api/venuess:
*   put:
*       summary: Updates a venue
*       tags: [Venues]
*       description: Updates a venue and geocodes the address
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Venue'
*       responses:
*           200:
*               description: The updated venue
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Venue'
*           401:
*               description: User is not authenticated
*           500:
*               description: Internal server error
*/
router.put(base, (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated")
        return
    }

    const updateVenue = new Venue(req.body)
    getGeoFromVenue(updateVenue).then((geo) => {
        updateVenue.geo = geo
        Venue.findOneAndUpdate({ name: updateVenue.name }, updateVenue, { new: true })
        .then((result) => res.json(result))
        .catch((err) => next(err));
    });
    
});


module.exports = router