/**
 * @fileoverview This file contains the account controller for handling user 
 * authentication and account management. We use the passport library to handle 
 * user authentication and session management.
 * 
 * @module controllers/account
 */
const express = require('express')
const router = express.Router()
const passport = require('passport');
const User = require("../models/user");

router.get("/api/accounts", (req, res) => {
    // TODO: check for admin role
    User.find({})
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load users: " + err }));
});

router.get("/api/accounts/authenticated", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, message: "User is authenticated", user: req.user, isAdmin: req?.user?.role === "Admin" ?? false});
    } else {
        res.json({ authenticated: false, message: "User is not authenticated" });
    }
});

router.get("/api/accounts/count", (req, res) => {
    User.estimatedDocumentCount()
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load counts: " + err }));
});


router.post("/api/accounts/register", (req, res) => {
    req.body.role = "User";
    User.register(new User(req.body), req.body.password, function (err, user) {
        if (err) {
            console.log("error: " + err )
            res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        }
        else {
            req.login(user, (er) => {
                if (er) {
                    console.log("error: " + er )
                    res.json({ success: false, message: er });
                }
                else {
                    console.log("User registered: " + user)
                    // remove salt & hash from user object before sending it to the client
                    req.user.salt = undefined;
                    req.user.hash = undefined;
                    res.json({ success: true, message: "Your account has been saved" });
                }
            });
        }
    });
});


/**
* @openapi
* /api/accounts/login:
*   post:
*       summary: Log in the user
*       tags: [Accounts]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           username:
*                               type: string
*                           password:
*                               type: string
*       responses:
*           200:
*               description: Login Result Message
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/ActionResult'
*           400:
*               description: Invalid request body
*           401:
*               description: Unauthorized
*           500:
*               description: Error occurred during login
*/
router.post("/api/accounts/login", (req, res) => {
    if (!req.body.username) {
        res.json({ success: false, message: "Username was not given" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Password was not given" })
    }
    else {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!user) {
                    res.json({ success: false, message: "username or password incorrect" });
                }
                else {
                    req.login(user, (er) => {
                        if (er) {
                            res.json({ success: false, message: er });
                        }
                        else {
                            res.json({ success: true, message: "You are logged in"});
                        }
                    });
                }
            }
        })(req, res);
    }
});

// TODO: ensure this is the current user or an admin
router.put("/api/accounts/", (req, res) => {
    console.log("update user: " + req.body)
    User.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not update user: " + err }));
});

/**
 * @openapi
 * /api/accounts/logout:
 *   delete:
 *      summary: Log out the current user
 *      tags: [Accounts]
 *      responses:
 *          200:
 *              description: Logout Result Message
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ActionResult'
 *          500:
 *              description: Error occurred during logout
 */
router.delete("/api/accounts/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { 
            res.json({ success: false, message: err }) 
        } else {
            res.json({ success: true, message: "Logout successful" })
        }
    });
});

// get favorites
router.get("/api/accounts/favorites/", (req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.user._id)
            .populate("favorites")
            .then((result) => res.json(result.favorites))
            .catch((err) => res.json({ success: false, message: "Could not load favorites: " + err }));
    } else {
        res.json([]);
    }
});

router.post('/api/accounts/favorites/', (req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.user._id)
            .then((user) => {
                user.favorites.push({ venue: req.body._id });
                user.save()
                    .then((result) => res.json(result))
                    .catch((err) => res.json({ success: false, message: "Could not favorite venue: " + err }));
            })
            .catch((err) => res.json({ success: false, message: "Could not find user: " + err }));
    }
});

router.delete('/api/accounts/favorites/', (req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.user._id)
            .then((user) => {
                user.favorites.pull(req.body.venue._id);
                user.save()
                    .then((result) => res.json(result))
                    .catch((err) => res.json({ success: false, message: "Could not unfavorite venue: " + err }));
            })
            .catch((err) => res.json({ success: false, message: "Could not find user: " + err }));
    }
});

module.exports = router;
