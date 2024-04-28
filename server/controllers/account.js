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
const email = require("../services/email");

router.get("/api/accounts", (req, res) => {
    // TODO: check for admin role
    User.find({})
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load users: " + err }));
});


/**
* @openapi
* /api/accounts/authenticated:
*   get:
*       summary: Returns details about the authenticated user
*       tags: [Accounts]
*       description: Returns a boolean indicating if the user is authenticated, the user object, and if the user is an admin. A message is also returned.
*       responses:
*           200:
*               description: A list of achievements
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/AuthenticatedResult'
* 
*/
router.get("/api/accounts/authenticated", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, message: "User is authenticated", user: req.user, isAdmin: req?.user?.role === "Admin" ?? false});
    } else {
        res.json({ authenticated: false, message: "User is not authenticated", user: null, isAdmin: false});
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
                    // TODO: better way to handle this
                    req.user.salt = undefined;
                    req.user.hash = undefined;
                    req.user.token = undefined;
                    req.user.tokenExpires = undefined;
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
                        else if (req.user.disabled) {
                            req.logout(() => {
                                res.json({ success: false, message: "Your account has been disabled. Please contact an administrator." });
                            });
                        }
                        else {
                            req.session.save(() => {
                                res.json({ success: true, message: "You are logged in"});
                            });
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


router.put("/api/accounts/password", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.json({ success: false, message: "User is not authenticated" });
    }

    User.findById(req.user._id)
        .then((user) => {
            user.changePassword(req.body.oldPassword, req.body.newPassword, (err) => {
                if (err) {
                    res.json({ success: false, message: "Could not change password: " + err });
                } else {
                    res.json({ success: true, message: "Password changed" });
                }
            });
        })
        .catch((err) => res.json({ success: false, message: "Could not find user: " + err }));
});

/**
* @openapi
* /api/accounts/forgot-password:
*   post:
*       summary: Send forgot password email
*       tags: [Accounts]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           email:
*                               type: string
*       responses:
*           200:
*               description: Send email result message
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
router.post("/api/accounts/forgot-password", (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                // email isn't found, but we don't want to give that information away
                res.json({ success: true, message: "Password reset email sent" });
            } else {
                // generate a 10 character token
                user.token = Math.random().toString(36).substring(2, 15);
                // add 1 hour to the current time
                user.tokenExpires = Date.now() + 3600000;
                user.save();

                email.sendPasswordReset(user.email, user.token)
                    .then(() => res.json({ success: true, message: "Password reset email sent" }))
                    .catch((err) => res.json({ success: false, message: "Could not send password reset email: " + err }));

            }
        })
        .catch((err) => res.json({ success: false, message: "Could not find user: " + err }));
});

router.post("/api/accounts/reset-password/:email/:token", (req, res) => {
    if (!req.params.email || !req.params.token) {
        return res.json({ success: false, message: "Email or token not provided" });
    } 

    User.findOne({ email: req.params.email, token: req.params.token })
        .then((user) => {
            if (!user) {
                res.json({ success: false, message: "Invalid token" });
            } else {
                // check if token has expired
                if (user.tokenExpires < Date.now()) {
                    res.json({ success: false, message: "Token has expired" });
                }

                user.setPassword(req.body.password, (err) => {
                    if (err) {
                        res.json({ success: false, message: "Could not reset password: " + err });
                    } else {
                        user.token = undefined;
                        user.tokenExpires = undefined;
                        user.save();
                        res.json({ success: true, message: "Password reset" });
                    }
                });
            }
        })
        .catch((err) => res.json({ success: false, message: "Could not find user: " + err }));
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

/**
* @openapi
* /api/accounts/favorites:
*   get:
*       summary: If authenticated, returns all favorited venues
*       tags: [Accounts]
*       description: If authenticated, returns all favorited venues
*       responses:
*           200:
*               description: A list of venues
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Venue'
* 
*/
router.get("/api/accounts/favorites/", (req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.user._id)
            .populate("favorites")
            .populate("favorites.venue")
            .exec()
            .then((result) => {
                let favorites = result.favorites.map(f => f.venue);
                result = favorites.map(venue => {
                    const venueObject = venue.toObject();
                    venueObject.favorite = req.user.favorites.some(f => f.venue.equals(venue._id));
                    return venueObject;
                });
                res.json(result);
            })
            .catch((err) => res.json({ success: false, message: "Could not load favorites: " + err }));
    } else {
        res.json([]);
    }
});

router.post('/api/accounts/favorites/', (req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.user._id)
            .then((user) => {
                if (!user.favorites) {
                    user.favorites = [];
                }
                if (user.favorites.find(f => f.venue == req.body._id)) {
                    return res.json({ success: false, message: "Venue already favorited" });
                }
                user.favorites.push({ venue: req.body._id });
                user.save()
                    .then((result) => res.json(result))
                    .catch((err) => res.json({ success: false, message: "Could not favorite venue: " + err }));
            })
            .catch((err) => res.json({ success: false, message: "Could not find user: " + err }));
    }
});

router.delete('/api/accounts/favorites/:id', (req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.user._id)
            .then((user) => {
                user.favorites = user.favorites.filter(f => f.venue != req.params.id);
                user.save()
                    .then((result) => res.json(result))
                    .catch((err) => res.json({ success: false, message: "Could not unfavorite venue: " + err }));
            })
            .catch((err) => res.json({ success: false, message: "Could not find user: " + err }));
    }
});

module.exports = router;
