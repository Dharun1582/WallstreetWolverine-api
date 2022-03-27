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
var checkRecordRouter = require('./routes/checkRecord');
var buyStockRouter = require('./routes/buyStock');
var sellStockRouter = require('./routes/sellStock');
var historyRouter = require('./routes/history');

var app = express();
global.index = 1;
const indId = setInterval(() => {
  index++;
  console.log(index);

  if (index >= 13) {
    console.log("Hi");
    clearInterval(indId);
  }
}, 20000);

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
app.use('/checkRecord', checkRecordRouter);
app.use('/buyStock', buyStockRouter);
app.use('/sellStock', sellStockRouter);
app.use('/history', historyRouter);

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
