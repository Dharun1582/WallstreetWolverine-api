var express = require('express');
var router = express.Router();
const graph = require('../data/graph.json');

/* GET users listing. */

router.get('/', function (req, res, next) {

  let date = new Date();
  let minutes = date.getMinutes();
  // if (minutes > 30) {
  //   minutes -= 30;
  // }
  minutes = minutes % 5;
  // let t = `${hours}:${minutes}`;
  res.json({
    i: index,
    gData: graph[index],
    ni: nIndex,
    time: minutes,
  });
});

module.exports = router;
