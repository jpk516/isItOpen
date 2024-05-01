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

/**
* @openapi
* /api/achievements/{id}:
*   get:
*       summary: Returns an achievement by id
*       tags: [Achievements]
*       description: Returns an achievement by id
*       parameters:
*           - in: path
*             name: id
*             required: true
*             description: The achievement id
*       responses:
*           200:
*               description: An achievement by id
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Achievement'
* 
*/
router.get(`${base}/:id`, (req, res) => {
    Achievement.findById(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load achievement: " + err }));
});

/**
* @openapi
* /api/achievements:
*   post:
*       summary: Creates a new achievement
*       tags: [Achievements]
*       description: Creates a new achievement
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Achievement'
*       responses:
*           200:
*               description: The created achievement
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Achievement'
*           401:
*               description: User is not authenticated
*           500:
*               description: Internal server error
*/
router.post(base, (req, res) => {
    Achievement.create(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not create achievement: " + err }));
});

/**
* @openapi
* /api/achievements:
*   put:
*       summary: Updates an achievement
*       tags: [Achievements]
*       description: Updates an achievement
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Achievement'
*       responses:
*           200:
*               description: The updated achievement
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Achievement'
*           401:
*               description: User is not authenticated
*           500:
*               description: Internal server error
*/
router.put(base, (req, res) => {
    Achievement.findByIdAndUpdate(req.body._id, req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not update achievement: " + err }));
});

module.exports = router;
