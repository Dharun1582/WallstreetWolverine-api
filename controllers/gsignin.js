const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");
const { getJWT } = require("./auth");
const url = require("url");

const User = require("../models").user;

const googleSignin = (req, res, next) => {
        if(!req.user) {
                return res.status(400).send({ message: "Server Error"});
        } else {
                const email = req.user._json.email;

                User.findOne({ where: { email }}).then((user) => {
                        
                        if(user) {

                                if(user.kid) {
                                        return res.redirect(process.env.GOOGLESUCCESS + url.format({ query: { 
                                                message: "Login Successful",
                                                token: getJWT(user.id), 
                                                auth: true,
                                                kid: "K" + user.kid, 
                                                firstname: user.firstname,
                                                lastname: user.lastname,
                                                email: user.email,
                                                phone: user.phone,
                                                college: user.college,
                                                year: user.year,
                                                dept: user.dept,
                                                cegian: user.cegian 
                                        } }));
                                } else {
                                        return res.redirect(process.env.GOOGLEDATA + url.format({ query: { 
                                                auth: true,
                                                email, 
                                                name: req.user._json.name, 
                                                token: getJWT(user.id) 
                                        } }));
                                }
                        } else {
                                
                                User.create({
                                        id: uuidv4(),
                                        email
                                }).then((user) => {
                                        if(user) {
                                                const token = getJWT(user.id);
                                                return res.redirect(process.env.GOOGLEDATA + url.format({ query: {
                                                        auth: true, 
                                                        email, 
                                                        name: req.user._json.name, 
                                                        token: getJWT(user.id) 
                                                } }));
                                        } else {
                                                
                                                return res.status(400).send({ message: "Server Error"});
                                        }
                                }).catch((err) => {
                                        return res.status(400).send({ message: "Server Error"});
                                });  
                        }
                }).catch((err) => {
                        return res.status(400).send({ message: "Server Error"});
                });

        }
};

const googleAuthRegister = async (req, res, next) => {
        
        // if (!req.body.captcha)
        //         return res.status(400).send({ 
        //                 message: 'Please select captcha' 
        //         });

  
        // const secretKey = process.env.captchasecret;
        
        // const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

        // const body = await fetch(verifyURL).then(res => res.json());
  
        // if (body.success !== undefined && !body.success)
        //         return res.status(400).send({ 
        //                 message: 'Failed captcha verification' 
        //         });

        const email = req.user.email;
        const cegian = req.cegian ? req.cegian : false;
        let firstname = '';
        let lastname = '';

        if(cegian === true) {   
                firstname = req.cname;
                lastname = '';
        } else {
                firstname = req.body.firstname;
                lastname = req.body.lastname;
        }

        User.findOne({ where: { email } }).then((user) => {    
               
                if(user) {
                        user.update({
                                id: uuidv4(),
                                kid: Math.floor(Math.random() * 100000000),
                                firstname: firstname,
                                lastname: lastname,
                                phone: req.body.phone,
                                college: cegian ? "College of Engineering Guindy": req.body.college,
                                roll: req.body.roll,
                                dept: req.body.dept,
                                year: req.body.year,
                                cegian: cegian
                        }).then(() => {
                                //registrationMail(user);
                                return res.status(200).send({ 
                                                        message: "Registration Successful",
                                                        auth: true,
                                                        token: getJWT(user.id),
                                                        kid: "K" + user.kid,
                                                        firstname: user.firstname,
                                                        lastname: user.lastname,
                                                        email: user.email,
                                                        phone: user.phone,
                                                        college: user.college,
                                                        year: user.year,
                                                        dept: user.dept,
                                                        cegian: user.cegian
                                                });
                        }).catch((err) => {
                                return res.status(400).send({ message: "Server Error"});
                        });
                } else {
                        return res.status(401).send({ message: "User not found. Try Again."});
                }
        }).catch((err) => {
                return res.status(500).send({ message: "Server Error"});
        });
};




module.exports = { googleSignin, googleAuthRegister };
