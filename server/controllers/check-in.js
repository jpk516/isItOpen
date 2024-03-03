const express = require('express')
const router = express.Router()
const passport = require('passport');
const Venue = require("../models/check-in");
const base = '/api/check-in/'

router.get(base, (req, res) => {
    Venue.find({})
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load check-ins: " + err }));
});

router.get(`${base}count`, (req, res) => {
    Venue.estimatedDocumentCount()
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load counts: " + err }));
});

// get based on venue
router.get(`${base}:venue`, (req, res) => {
    if (req.isAuthenticated()) {
        Venue.find({venue: req.params.venue})
            .then((result) => res.json(result))
            .catch((err) => res.json({ success: false, message: "Could not load check-ins. Error: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

// get based on user
router.get(`${base}:user`, (req, res) => {
    if (req.isAuthenticated()) {
        Venue.find({user: req.params.user})
            .then((result) => res.json(result))
            .catch((err) => res.json({ success: false, message: "Could not load check-ins. Error: " + err }));
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
    newVenue.save()
        .then((result) => res.json(result))
        .catch((err) => {
            res.status(500).send(err.message)
        });
});