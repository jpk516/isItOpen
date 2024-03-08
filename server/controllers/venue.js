const express = require('express')
const router = express.Router()
const passport = require('passport');
const Venue = require("../models/venue");
const base = '/api/venues'
const { getGeoFromVenue } = require('../services/geocoding');
const { add } = require('../models/pointSchema');

// TODO: add roles / auth to routes
//       We don't need to call the geo service if the address hasn't changed

router.get(base, (req, res) => {
    Venue.find({})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => res.json({ success: false, message: "Could not load venues: " + err }));
});

router.get(`${base}/select-list`, (req, res) => {
    Venue.find({}).select('name')
        .then((result) => {
            res.json(result)
        })
        .catch((err) => res.json({ success: false, message: "Could not load venues: " + err }));
});

router.get(`${base}/count`, (req, res) => {
    Venue.estimatedDocumentCount()
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load counts: " + err }));
});

router.get(`${base}/:name`, (req, res) => {
    if (req.isAuthenticated()) {
        Venue.find({name: req.params.name})
            .then((result) => res.json(result[0]))
            .catch((err) => res.json({ success: false, message: "Could not load venue. Error: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

router.post(base, (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated")
        return
    }
    const newVenue = new Venue(req.body.venue)
    getGeoFromVenue(newVenue).then((geo) => {
        newVenue.geo = geo
        console.log(newVenue)
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

router.put(base, (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated")
        return
    }

    const updateVenue = new Venue(req.body.venue)
    getGeoFromVenue(updateVenue).then((geo) => {
        updateVenue.geo = geo
        Venue.findOneAndUpdate({ name: updateVenue.name }, updateVenue, { new: true })
        .then((result) => res.json(result))
        .catch((err) => next(err));
    });
    
});


module.exports = router