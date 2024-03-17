
/**
 * @fileoverview This file contains the implementation of the check-in controller.
 * It handles the routes related to check-ins, such as retrieving all check-ins, 
 * counting check-ins, retrieving check-ins for a specific venue, retrieving check-ins 
 * made by a specific user, and creating a new check-in.
 * 
 * @module controllers/check-in
 */
const express = require('express')
const router = express.Router()
const passport = require('passport');
const CheckIn = require("../models/check-in");
const base = '/api/check-ins'

/**
* @openapi
* /api/check-ins:
*   get:
*       summary: Returns all check-ins
*       tags: [Check-Ins]
*       description: Returns all check-ins for all venues
*       responses:
*           200:
*               description: A list of check-ins
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/CheckIn'
* 
*/
router.get(base, (req, res) => {
    CheckIn.find({})
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load check-ins: " + err }));
});

/**
* @openapi
* /api/check-ins/recent/{limit}:
*   get:
*       summary: Returns the most recent check-ins
*       tags: [Check-Ins]
*       description: Returns the most recent check-ins
*       parameters:
*           - in: path
*             name: limit
*             required: false
*             description: The number of recent check-ins to return. (default 20)
*       responses:
*           200:
*               description: A list of recent check-ins
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/CheckIn'
* 
*/
router.get(`${base}/recent/:limit?`, (req, res) => {
    CheckIn.find({}).sort({createdAt: -1}).limit(req?.params?.limit ?? 20)
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load check-ins: " + err }));
});


/**
* @openapi
* /api/check-ins/count:
*   get:
*       summary: Returns count of all check-ins
*       tags: [Check-Ins]
*       description: Returns count of all check-ins
*       responses:
*           200:
*               description: A list of check-ins
*               content:
*                   application/json:
*                       schema:
*                           type: integer
* 
*/
router.get(`${base}/count`, (req, res) => {
    CheckIn.estimatedDocumentCount()
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load counts: " + err }));
});

/**
* @openapi
* /api/check-ins/venue/{venueId}:
*   get:
*       summary: Returns all check-ins for a venue
*       tags: [Check-Ins]
*       description: Returns all check-ins for a venue
*       parameters:
*           - in: path
*             name: venueId
*             required: true
*             description: The venue ID
*       responses:
*           200:
*               description: A list of check-ins for specified venue
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/CheckIn'
* 
*/
router.get(`${base}/venue/:venue`, (req, res) => {
    if (req.isAuthenticated()) {
        CheckIn.find({venue: req.params.venue})
            .then((result) => res.json(result))
            .catch((err) => res.json({ success: false, message: "Could not load check-ins. Error: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

/**
* @openapi
* /api/check-ins/user/{userId}:
*   get:
*       summary: Returns all check-ins made by a user
*       tags: [Check-Ins]
*       description: Returns all check-ins made by a user
*       parameters:
*           - in: path
*             name: userId
*             required: true
*             description: The user ID
*       responses:
*           200:
*               description: A list of check-ins for specified user
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/CheckIn'
* 
*/
router.get(`${base}/user/:user`, (req, res) => {
    if (req.isAuthenticated()) {
        CheckIn.find({user: req.params.user})
            .then((result) => res.json(result))
            .catch((err) => res.json({ success: false, message: "Could not load check-ins. Error: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

/**
* @openapi
* /api/check-ins:
*   post:
*       summary: Creates a new check-in
*       tags: [Check-Ins]
*       description: Creates a new check-in
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/CheckIn'
*       responses:
*           200:
*               description: The created check-in
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/CheckIn'
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
    const newCheckIn = new CheckIn(req.body)
    newCheckIn.user = req.user._id
    newCheckIn.save()
        .then((result) => res.json(result))
        .catch((err) => {
            res.status(500).send(err.message)
        });
});

module.exports = router