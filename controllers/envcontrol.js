const dotenv = require("dotenv");
dotenv.config();

exports.environment = [
        {
                type: "development",
                url: process.env.DEVURL,
                paymenturl: process.env.PAYURLDEV
        },
        {
                type: "production",
                url: process.env.PRODURL,
                paymenturl: process.env.PAYURLPROD
        }
];
