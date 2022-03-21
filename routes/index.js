var express = require('express');
var router = express.Router();
const Members=require("./../models").Members;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register',(req,res)=>{
  // res.send("hii");
  // console.log("Hi dharun")
  console.log(req.body);
    Members.create({
    kid:req.body.kId,
    name:req.body.name,
    cnumber:req.body.number,
    college:req.body.college,
    mail:req.body.email,
    department:req.body.department,
    password:req.body.password
  }).then(()=>{
    res.json({
      state:"Registered Succesfully"
    })
  }).catch((err)=>{
    console.log("create error")
    console.log(err);
})
  
})

module.exports = router;
