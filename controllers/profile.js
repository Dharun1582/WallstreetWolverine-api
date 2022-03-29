const { sequelize } = require("../models");
const stocks = require("../models").stocks;
const users = require("../models").user;
const transactions = require("../models").transactions;


const getHistory = async (req, res) => {
    try {
        const { email } = req.user;
        

        const user = await users.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(404).send({
                message: "User details not found."
            });
        }


        // const email = 'qwerty@gmail.com';
        const historyData = await transactions.findAll({
            where: {
                email: email,
            },
            order: sequelize.literal('createdAt DESC'),
        });

        if (historyData) {
            return res.send(historyData);
        }
        else {
            return res.status(404).send({
                message: "User details not found",
            });
        }



    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server Error. Try again.", gh: 'con' });
    }
}


const getProfile = async (req, res) => {
    try {
        const { email } = req.user;
        

        const user = await users.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(404).send({
                message: "User details not found."
            });
        }


        // const email = 'qwerty@gmail.com';
        const stockData = await stocks.findOne({
            where: {
                email,
            },
        });

        if (stockData) {
            const profile = {stockTable: stockData, userTable: user};
            return res.send(profile);
        }
        else {
            return res.status(404).send({
                message: "User details not found",
            });
        }



    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server Error. Try again.", gh: 'con' });
    }
}

module.exports = {
    getProfile,
    getHistory,
};