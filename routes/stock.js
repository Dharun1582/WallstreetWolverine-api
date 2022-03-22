const router = require("express").Router();

const authMiddleware = require("../middleware/tokenAuth");

const stock = require("../controllers/stock");

router.post(
	"/",
	// authValidator.tokenAuthValidator,
	// leaderboardValidator.registerPlayerValidator,
	// validator.validate,
	authMiddleware.tokenAuth,
	stock.getWallet,
)
module.exports = router;
