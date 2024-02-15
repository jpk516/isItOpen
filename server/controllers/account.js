const express = require('express')
const router = express.Router()
const passport = require('passport');
const User = require("../models/user");

router.get("/api/account/", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ success: true, message: "User is authenticated", user: req.user });
    } else {
        res.json({ success: false, message: "User is not authenticated" });
    }
});

router.get("/api/account/count", (req, res) => {
    User.estimatedDocumentCount()
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load counts: " + err }));
});


router.post("/api/account/register", (req, res) => {
    User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        }
        else {
            req.login(user, (er) => {
                if (er) {
                    res.json({ success: false, message: er });
                }
                else {
                    res.json({ success: true, message: "Your account has been saved" });
                }
            });
        }
    });
});

router.post("/api/account/login", (req, res) => {
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
                            res.json({ success: true, message: "You are logged in" });
                        }
                    });
                }
            }
        })(req, res);
    }
});

router.delete("/api/account/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { 
            res.json({ success: false, message: err }) 
        } else {
            res.json({ success: true, message: "logout successful" })
        }
      });
});

module.exports = router