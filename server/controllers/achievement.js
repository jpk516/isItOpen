const express = require('express');
const router = express.Router();
const Achievement = require('../models/achievement');
const base = '/api/achievements';


/**
* @openapi
* /api/achievements:
*   get:
*       summary: Returns all achievements
*       tags: [Achievements]
*       description: Returns all achievements
*       responses:
*           200:
*               description: A list of achievements
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Achievement'
* 
*/
router.get(base, (req, res) => {
    Achievement.find({})
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load achievements: " + err }));
});

module.exports = router;
