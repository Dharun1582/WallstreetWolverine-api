var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function (req, res, next) {

  let date = new Date();
  let minutes = date.getMinutes();
  // if (minutes > 30) {
  //   minutes -= 30;
  // }
  if (minutes%2 == 0){
    minutes = 2;
  }
  else{
    minutes = 1;
  }
  // let t = `${hours}:${minutes}`;
  res.json({
    i: index,
    ni: nIndex,
    time: minutes,
  });
});

module.exports = router;
