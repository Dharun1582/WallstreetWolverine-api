// const { col } = require("sequelize/types");
// const { sequelize } = require("../models");

const { sequelize } = require("../models");

const stocks = require("../models").stocks;
const users = require("../models").user;
const transactions = require("../models").transactions;
const graph = require("../data/graph.json");
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
                VocaCola: 0,
                Yecher: 0,
                HindPetroleum: 0,
                VI: 0,
                LyccaLabs: 0,
                Abibas: 0,
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

        if (nos < 0) {
            return res.status(403).send({
                message: "Invalid Number of Stocks"
            });
        }

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


        
        const stockData = await stocks.update({[column]: sequelize.literal(`${column} + ${nos}`), Wallet : sequelize.literal(`Wallet - ${nos}*${value}`)},{
            where: {
                email,
            },
        });

        if (stockData) {
            console.log(stockData)
            transactions.create({
                email: email,
                company: column,
                flag: "Bought",
                number: nos,
            });
            return res.status(200).send({message:"transaction success"});
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
        const hour = new Date().getHours();
        if ( hour > 16 || hour < 10 ){
            return res.status(403).send({
                message: "Market is Closed!"
            });
        }
        const { email } = req.user;
        const  column  = req.params.column;
        const  value  = req.params.value;
        const  nos = req.params.nos;
        if (nos < 0) {
            return res.status(403).send({
                message: "Invalid Number of Stocks"
            });
        }

        if(value != graph[index][column][5]){
            return res.status(403).send({
                message: "Suprise Mothafucka"
            });
        }
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


        
        const stockData = await stocks.update({[column]: sequelize.literal(`${column} - ${nos}`), Wallet : sequelize.literal(`Wallet + ${nos}*${value}`)},{
            where: {
                email,
            },
        });

        if (stockData) {
            console.log(stockData)
            transactions.create({
                email: email,
                company: column,
                flag: "Sold",
                number: nos,
            })
            return res.status(200).send({message:"transaction success"});
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
    getWallet,
    checkUser,
    buyStock,
    sellStock,
};
