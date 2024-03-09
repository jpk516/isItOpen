const express = require('express');
const Tag = require("../models/tag");

const router = express.Router();
const base = '/api/tags';

/**
 * @openapi
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           unique: true
 *           index: true
 *           required: true
 */

/**
 * @openapi
 * /api/tags:
 *   get:
 *     description: Returns all tags
 *     responses:
 *       200:
 *        description: A list of tags
 *       content:
 *          application/json:
 *          schema:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Tag'
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
 *     description: Creates a new tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: The created tag
 *       401:
 *         description: User is not authenticated
 *       500:
 *         description: Internal server error
 */
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

    const updateTag = req.body.tag
    Tag.findOneAndUpdate({ name: updateTag.name }, updateTag, { new: true })
        .then((result) => res.json(result))
        .catch((err) => next(err));
});

module.exports = router;