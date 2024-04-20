
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
        .sort({created: -1})
        .where('hidden').ne(true)
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
    if (req.isAuthenticated()) {
    CheckIn.find({})
        .sort({created: -1})
        .limit(req?.params?.limit ?? 20)
        .populate('venue')
        .populate({ path: 'user', select: 'username -_id'})
        .where('hidden').ne(true)
        .exec()
        .then(checkIns => {
            if (checkIns?.length > 0) {
                const resultsWithVoteStatus = setUserVoteStatus(checkIns, req.user._id);
                return res.json(resultsWithVoteStatus);
            }
            return res.json(checkIns);
        })
        .catch((err) => res.json({ success: false, message: "Could not load check-ins: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
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
    console.log("req details", req.isAuthenticated(), req.params.venue, req.user);
    if (req.isAuthenticated()) {
        CheckIn.find({venue: req.params.venue})
            .sort({created: -1})
            .populate('venue')
            .populate({ path: 'user', select: 'username -_id'})
            .where('hidden').ne(true)
            .exec()
            .then(checkIns => {
                if (checkIns?.length > 0) {
                    const resultsWithVoteStatus = setUserVoteStatus(checkIns, req.user._id);
                    return res.json(resultsWithVoteStatus);
                }
                return res.json(checkIns);
            })
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
    if (!req.isAuthenticated()) {
        return res.status(401).send("User is not authenticated");
    }

    CheckIn.find({user: req.params.user})
        .sort({created: -1})
        .populate('venue')
        .populate({ path: 'user', select: 'username -_id'})
        .where('hidden').ne(true)
        .exec()
        .then(checkIns => {
            if (checkIns?.length > 0) {
                const resultsWithVoteStatus = setUserVoteStatus(checkIns, req.user._id);
                return res.json(resultsWithVoteStatus);
            }
            return res.json(checkIns);
        })
        .catch(err => res.json({ success: false, message: "Could not load check-ins. Error: " + err }));
});


const setUserVoteStatus = (checkIns, userId) => {
    return checkIns.map(checkIn => {
        return setVoteStatus(checkIn, userId);
    });
}


const setVoteStatus = (checkIn, userId) => {
    checkIn.votes = checkIn.votes || [];
    const userVote = checkIn.votes.find(vote => vote.user.equals(userId));
    const userVoteStatus = userVote ? { voted: true, up: userVote.up } : { voted: false };
    
    // Convert check-in to a plain object to modify it
    const checkInObject = checkIn.toObject();
    
    // Append userVoteStatus to the check-in object
    checkInObject.userVoteStatus = userVoteStatus;
    
    // Remove the votes array to not send it in the response
    delete checkInObject.votes;

    return checkInObject;
}

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

// add an vote to a check-in
router.post(`${base}/vote/:id`, (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("User is not authenticated");
    }

    CheckIn.findById(req.params.id)
        .then(checkIn => {
            if (!checkIn) {
                return res.status(404).send("Check-in not found");
            }
            // have they voted yet?
            const existingVoteIndex = checkIn.votes.findIndex(vote => vote.user.equals(req.user._id));

            if (existingVoteIndex > -1) {
                if (checkIn.votes[existingVoteIndex].up !== req.body.up) {
                    // this is a changed voted
                    checkIn.votes[existingVoteIndex].up = req.body.up;
                    checkIn.votes[existingVoteIndex].created = new Date();
                } else {
                    // this is the same vote, so really
                    // a request to remove the vote
                    checkIn.votes.splice(existingVoteIndex, 1);
                }
            } else {
                // this is a new vote
                checkIn.votes.push({
                    user: req.user._id,
                    up: req.body.up,
                    created: new Date()
                });
            }

            // NOTE: right now I am recounting every time. this could be optimized
            // to either add or remove 1 from the count based on the vote or
            // only updated periodically if we have sync issues
            checkIn.upvoteCount = checkIn.votes.filter(vote => vote.up).length;
            checkIn.downvoteCount = checkIn.votes.filter(vote => !vote.up).length;
            
            // save and return the user specific vote status
            checkIn.save()
                .then(result => {
                    const resultsWithVoteStatus = setVoteStatus(result, req.user._id);
                    return res.json(resultsWithVoteStatus);
                })
                .catch(err => res.status(500).send(err.message));
        })
        .catch(err => res.status(500).send(err.message));
});

router.delete(`${base}/:id`, (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("User is not authenticated");
    }

    CheckIn.findById(req.params.id)
        .then(checkIn => {
            if (!checkIn) {
                return res.status(404).send("Check-in not found");
            }
            console.log(req.user);

            if (checkIn?.user?.equals(req.user._id) || req.user.role === 'Admin') {
                // set to hidden instead of deleting
                checkIn.hidden = true;
                checkIn.save()
                    .then(result => res.json(result))
                    .catch(err => res.status(500).send(err.message));
            } else {
                res.status(403).send("User is not authorized to delete this check-in");
            }
        })
        .catch(err => res.status(500).send(err.message));
});

module.exports = router