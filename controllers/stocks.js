// const { col } = require("sequelize/types");
// const { sequelize } = require("../models");

const { sequelize } = require("../models");

const stocks = require("../models").stocks;
const users = require("../models").user;
const transactions = require("../models").transactions;
// const Members = require("../models").Members;


const checkUser = async (req, res) => {
    try {
        const { email } = req.user;
        // const email = 'qwerty@gmail.com';

        const stockData = await stocks.findOne({
            where: {
                email,
            },
        });

        if (stockData) {
            // return res.send(stockData);
        }
        else {
            // return res.status(404).send({
            //     message: "User details not found",
            // });
            stocks.create({
                email: email,
                CokaCula: 0,
                HettanPetroleum: 0,
                Vedophene: 0,
                Abibas: 0,
                LycaLabs: 0,
                Yechier: 0,
                Wallet: 10000,
            }).then(() => {
                res.json({
                    state: "Registered Succesfully"
                })
            }).catch((err) => {
                console.log("create error");
                console.log(err);
            })
        }



    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server Error. Try again.", gh: 'con' });
    }
}




const getWallet = async (req, res) => {
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
            return res.send(stockData);
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



const buyStock = async (req, res) => {
    try {
        const { email } = req.user;
        const  column  = req.params.column;
        const  value  = req.params.value;
        const  nos = req.params.nos;
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


        
        const stockData = await stocks.update({[column]: sequelize.literal(`${column} + ${nos}`), Wallet : value},{
            where: {
                email,
            },
        });

        if (stockData) {
            console.log(stockData)
            transactions.create({
                email: email,
                company: column,
                flag: 1,
                number: nos,
            });
            return res.status(200).send("transaction success");
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

const sellStock = async (req, res) => {
    try {
        const { email } = req.user;
        const  column  = req.params.column;
        const  value  = req.params.value;
        const  nos = req.params.nos;
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


        
        const stockData = await stocks.update({[column]: sequelize.literal(`${column} - ${nos}`), Wallet : value},{
            where: {
                email,
            },
        });

        if (stockData) {
            console.log(stockData)
            transactions.create({
                email: email,
                company: column,
                flag: 2,
                number: nos,
            })
            return res.status(200).send("transaction success");
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

const checkRecord = async (req, res) => {
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
        const Op = sequelize.Op;
        const NOW = new Date();
        const min = NOW.getMinutes();
        const START = new Date();
        console.log(START)
        START.setHours(NOW.getHours(),((min>30)?30:0));
        console.log(START)
        console.log(NOW)
        console.log(NOW.getHours())
        const stockData = await transactions.findOne({
            where: {
                email: email,
                createdAt: {
                    [Op.gt]: START,
                    [Op.lt]: NOW
                }
            },
        });

        if (stockData) {
            return res.status(403).send({
                message: "Cannot proceed transaction"
            });
        }
        else {
            return res.status(200).send({
                message: "Transaction under processing",
            });
        }



    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server Error. Try again.", gh: 'con' });
    }
}


module.exports = {
    getWallet,
    checkUser,
    buyStock,
    sellStock,
    checkRecord,
};
