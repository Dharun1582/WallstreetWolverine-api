require("dotenv").config();

const jwt = require("jsonwebtoken");

const Users = require("../models").user;


const tokenAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		let tokenPayload;
		try {
			tokenPayload = jwt.verify(token, process.env.JWTENCRYPTION);
		} catch (error) {
			return res.status(401).send({
				message: error.name + ": " + error.message,
			});
		}
		if (!tokenPayload.id) {
			return res.status(400).send({
				message: "Invalid token.",
			});
		}

		const user = await Users.findOne({
			where: {
				id: tokenPayload.id,
			}
		});

		if (!user) {
			return res.status(403).send({
				message: "User details not found.",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			message: "Server Error. Try again."
		});
	}
}

module.exports = {
	tokenAuth,
};
