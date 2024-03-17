/**
*@fileoverview This file contains the implementation of the tag controller.
*It handles the routes related to tags, such as retrieving all tags, creating a new tag,
*and updating a tag.

*@module controllers/tag
*/

const express = require('express');
const Tag = require("../models/tag");

const router = express.Router();
const base = '/api/tags';

/**
* @openapi
* /api/tags:
*   get:
*       summary: Returns all tags
*       tags: [Tags]
*       description: Returns all tags
*       responses:
*           200:
*               description: A list of tags
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Tag'
* 
*/
router.get(base, (req, res) => {
    Tag.find({})
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load tags: " + err }));
});

/**
* @openapi
* /api/tags:
*   post:
*       summary: Creates a new tag
*       tags: [Tags]
*       description: Creates a new tag
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Tag'
*       responses:
*           200:
*               description: The created tag
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Tag'
*           401:
*               description: User is not authenticated
*           500:
*               description: Internal server error
*/
router.post(base, (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated");
        return;
    }
    const newTag = new Tag(req.body);
    newTag.save()
        .then((result) => res.json(result))
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

/**
* @openapi
* /api/tags:
*   put:
*       summary: Updates a tag
*       tags: [Tags]
*       description: Updates a tag
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Tag'
*       responses:
*           200:
*               description: The updated tag
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Tag'
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

    const updateTag = req.body
    Tag.findOneAndUpdate({ _id: updateTag._id }, updateTag, { new: true })
        .then((result) => res.json(result))
        .catch((err) => next(err));
});

/**
* @openapi
* /api/tags/{id}:
*   delete:
*       summary: Deletes a tag by ID
*       tags: [Tags]
*       description: Deletes a tag by ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*             description: ID of the tag to delete
*       responses:
*           200:
*               description: The deleted tag
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Tag'
*           401:
*               description: User is not authenticated
*           500:
*               description: Internal server error
*/
router.delete(`${base}/:id`, (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated");
        return;
    }

    const tagId = req.params.id;
    Tag.findByIdAndDelete(tagId)
        .then((result) => res.json(result))
        .catch((err) => next(err));
});


module.exports = router;