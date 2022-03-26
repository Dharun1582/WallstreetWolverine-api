const router = require("express").Router();

const authMiddleware = require("../middleware/tokenAuth");

const stocks = require("../controllers/stocks");

router.get(
	"/",
	// authValidator.tokenAuthValidator,
	// leaderboardValidator.registerPlayerValidator,
	// validator.validate,
	authMiddleware.tokenAuth,
	stocks.checkUser,
)
module.exports = router;
