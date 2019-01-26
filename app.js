var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');

var passport = require('passport');
var config = require('./config/database');

// Create a connection to mean-angular6 mongo database  
// http://www.fullstackjs.com/book/10/connect-mongoose-bluebird.html
mongoose.Promise = require('bluebird');// Promisify-ing Mongoose

mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('Connection to database succesful'))
  .catch((err) => console.error(err));

//mongoose.connect('mongodb://localhost/mean-angular6')
 // .then(() =>  console.log('connection succesful'))
 // .catch((err) => console.error(err));

 // variable for API route
var apiRouter = require('./routes/book');// change book to api
var app = express();

// Initialize passport
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using mean-angular6 database
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/books', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-details/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-create', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-edit/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
//app.use('/', express.static(path.join(__dirname, 'dist/mean-angular6')));

// Add API route to endpoint URL
app.use('/api', apiRouter);

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
  res.send(err.status);
});

module.exports = app;
