const express = require("express");
const passport = require("passport");
require("../controllers/googleAuth.js")(passport);
const router = express.Router();

const auth = require("../controllers/gsignin");

router.get("/googlesignin",
        passport.authenticate("google", {
                scope: ["profile", "email"]
        })
);

router.get("/google/callback",
        passport.authenticate("google", {
                failureRedirect: "/auth/googleautherror"
        }),
        (err, req, res, next) => {
                if (err)
                        res.redirect("/auth/googlesignin");
                else
                        next();
        },
        auth.googleSignin
);

router.get("/googleautherror", (req, res) => {
        res.status(401).send({ message: "Google Authentication Error. Try Again." });
});

module.exports = router;
