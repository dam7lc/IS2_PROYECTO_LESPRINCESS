var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var infoEquipoRouter = require('./routes/infoEquipo');
var contenedordockerRouter = require('./routes/contenedordocker');
var dockerfileRouter = require('./routes/dockerfile');
var cicloVidaRouter = require('./routes/cicloVida');
var introduccionRouter = require('./routes/introduccion');
var directivasRouter = require('./routes/directivas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/infoEquipo', infoEquipoRouter);
app.use('/contenedordocker', contenedordockerRouter);
app.use('/dockerfile', dockerfileRouter);
app.use('/cicloVida', cicloVidaRouter);
app.use('/introduccion', introduccionRouter);
app.use('/directivas', directivasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
