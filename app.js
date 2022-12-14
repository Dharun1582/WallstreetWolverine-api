var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var userRouter = require('./routes/user');
var graphRouter = require('./routes/graphUpdate');
var stockRouter = require('./routes/stocks');
var checkRouter = require('./routes/checkUser');
// var checkRecordRouter = require('./routes/checkRecord');
var buyStockRouter = require('./routes/buyStock');
var sellStockRouter = require('./routes/sellStock');
var historyRouter = require('./routes/history');
var authRoutes = require('./routes/auth');

var app = express();
global.index = 1;
//news-index
global.nIndex = 1;

global.min = 0;
global.Min = 0;

const setIndex = () => {
  const currTime = new Date();
  const startTime = new Date("Fri Apr 01 2022 10:00:00 GMT+0530");
  const minDiff = (parseInt(Math.abs(currTime.getTime()-startTime.getTime())/(1000*60)));
  const x = minDiff/30;
  const y = minDiff/15;
  nIndex = Math.ceil(y);
  index = Math.ceil(x);
}

setIndex();



/*const setIndex=()=>{
  var cur_time=new Date();
  var start_time=new Date("Sat Mar 31 2022 16:00:00 GMT+0530");
  // console.log();
  var mindiff=(parseInt(Math.abs(cur_time.getTime() - start_time.getTime()) / (1000 * 60)));
  var x=mindiff/30;
  var y=mindiff/15;

  nIndex=Math.ceil(y);
  index=Math.ceil(x); 
}

setIndex();*/


const indId = setInterval(() => {
  min += 1;
  if (min >= 30) {
    index += 1;
    min = 0;
  }


  if (index >= 61) {
    console.log("Hi");
    clearInterval(indId);
  }
}, 60000);

//news-index
const nIndId = setInterval(() => {
  Min += 1;
  if (Min >= 15) {
    nIndex += 1;
    Min = 0;
  }
  if (nIndex >= 153) {
    console.log("Hello");
    clearInterval(nIndId);
  }
}, 60000);

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/profile', userRouter);
app.use('/graphUpdate', graphRouter);
app.use('/stock', stockRouter);
app.use('/checkUser', checkRouter);
// app.use('/checkRecord', checkRecordRouter);
app.use('/buyStock', buyStockRouter);
app.use('/sellStock', sellStockRouter);
app.use('/history', historyRouter);
app.use('/api/auth', authRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
