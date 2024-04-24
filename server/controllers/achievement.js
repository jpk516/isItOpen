const express = require('express');
const router = express.Router();
const Achievement = require('../models/achievement');
const base = '/api/achievements';


router.get(base, (req, res) => {
    Achievement.find({})
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load achievements: " + err }));
});
