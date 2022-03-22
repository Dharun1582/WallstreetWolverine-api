const Stock = require("../models").Stock;
const Members = require("../models").Members;

const getWallet = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await Stock.findOne({
            where: {
                email,
            },
        });

        if (user) {
            return res.send(user);
        }
        else {
            return res.status(404).send({
				message: "User details not found",
			});
        }



    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server Error. Try again." });
    }
}


module.exports = {
    getWallet,
};
