const router = require("express").Router();

const authMiddleware = require("../middleware/tokenAuth");

const stocks = require("../controllers/stocks");

router.get(
	"/:column/:value/:nos/",
	// authValidator.tokenAuthValidator,
	// leaderboardValidator.registerPlayerValidator,
	// validator.validate,
	authMiddleware.tokenAuth,
	stocks.sellStock,
)
module.exports = router;
