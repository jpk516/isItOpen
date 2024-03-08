const express = require('express');
const Tag = require("../models/tag");

const router = express.Router();
const base = '/api/tags';

router.get(base, (req, res) => {
    Tag.find({})
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load tags: " + err }));
});

router.post(base, (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated");
        return;
    }
    const newTag = new Tag(req.body.tag);
    newTag.save()
        .then((result) => res.json(result))
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

router.put(base, (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated")
        return
    }

    Tag.findOneAndUpdate({ name: updateVenue.name }, updateVenue, { new: true })
        .then((result) => res.json(result))
        .catch((err) => next(err));
});

module.exports = router;