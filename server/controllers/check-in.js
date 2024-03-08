const express = require('express')
const router = express.Router()
const passport = require('passport');
const CheckIn = require("../models/check-in");
const base = '/api/check-ins'

router.get(base, (req, res) => {
    CheckIn.find({})
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load check-ins: " + err }));
});

router.get(`${base}/count`, (req, res) => {
    CheckIn.estimatedDocumentCount()
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load counts: " + err }));
});

// get based on venue
router.get(`${base}/venue/:venue`, (req, res) => {
    if (req.isAuthenticated()) {
        CheckIn.find({venue: req.params.venue})
            .then((result) => res.json(result))
            .catch((err) => res.json({ success: false, message: "Could not load check-ins. Error: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

// get based on user
router.get(`${base}/user/:user`, (req, res) => {
    if (req.isAuthenticated()) {
        CheckIn.find({user: req.params.user})
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
    const newCheckIn = new CheckIn(req.body.checkIn)
    newCheckIn.user = req.user._id
    newCheckIn.save()
        .then((result) => res.json(result))
        .catch((err) => {
            res.status(500).send(err.message)
        });
});

module.exports = router