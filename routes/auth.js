const express = require("express");
const passport = require("passport");
require("../controllers/googleauth.js")(passport);
const router = express.Router();

const auth = require("../controllers/gsignin");
const token = require("../controllers/auth");
const Validator = require("../validators");
const ref = require("../controllers/ref");
const cegian = require("../controllers/cegian");

router.get("/googlesignin",
        passport.authenticate("google", { 
                scope : ["profile", "email"] 
        })
);

router.get("/google/callback", 
        passport.authenticate("google", { 
                failureRedirect: "/auth/googleautherror" 
        }),
        (err, req, res, next) => {
                if(err) 
                        res.redirect("/auth/googlesignin");
                else
                        next();
        },
        auth.googleSignin
);

router.post("/googledata", Validator.googleUserData, token.tokenAuth, cegian.register, ref.ref, auth.googleAuthRegister);

router.get("/googleautherror", (req, res) => {
        res.status(401).send({ message: "Google Authentication Error. Try Again." });
});

module.exports = router;
