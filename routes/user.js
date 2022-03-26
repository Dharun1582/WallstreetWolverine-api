const router = require("express").Router();

const authMiddleware = require("../middleware/tokenAuth");

const profile = require("../controllers/profile");

router.get(
	"/",
	// authValidator.tokenAuthValidator,
	// leaderboardValidator.registerPlayerValidator,
	// validator.validate,
	authMiddleware.tokenAuth,
	profile.getProfile,
)
module.exports = router;
