const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const dotenv = require("dotenv");
dotenv.config();

const environment = require("../controllers/envcontrol").environment;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = (passport) => {
        passport.use(new GoogleStrategy({
                        clientID: GOOGLE_CLIENT_ID,
                        clientSecret: GOOGLE_CLIENT_SECRET,
                        callbackURL: process.env.DEVURL + "api/auth/google/callback"
                },
                function (accessToken, refreshToken, profile, done) {
                        userProfile = profile;
                        return done(null, userProfile);
                }
        ));

        passport.serializeUser(function (user, cb) {
                cb(null, user);
        });

        passport.deserializeUser(function (obj, cb) {
                cb(null, obj);
        });
}
