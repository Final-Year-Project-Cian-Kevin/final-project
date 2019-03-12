var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cron = require('node-cron');
var mongoose = require('mongoose');
var passport = require('passport');

var config = require('./config/database');
var redditJob = require('./jobs/RedditDatabase.js');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize passport
app.use(passport.initialize());

// Create a connection to mean-angular6 mongo database  
// http://www.fullstackjs.com/book/10/connect-mongoose-bluebird.html
mongoose.Promise = require('bluebird');// Promisify-ing Mongoose

mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('\x1b[32m%s\x1b[0m', 'INFO: Connection to database succesfull'))
  .catch((err) => console.error(err));

//mongoose.connect('mongodb://localhost/mean-angular6')
 // .then(() =>  console.log('connection succesful'))
 // .catch((err) => console.error(err));

 // variable for API route
var apiRouter = require('./routes/book'); 
var apiReddit = require('./routes/reddit');
var apiRouterUser = require('./routes/user');// change book to api
var apiRouterProfile = require('./routes/profile');// change book to api
var apiRouterAssets = require('./routes/assets');
var apiRouterComment = require('./routes/comment');
var apiRouterSavePost = require('./routes/savedPost');
var apiRouterFollow = require('./routes/follow');// change book to api

// Using mean-angular6 database
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));

//create a cors middleware , that adds the cors origin header ro the response, as well as allowed methods for that origin
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  console.log("[SERVER INFO]: Access control");

      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });


app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/index', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/login', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/post/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/profile/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/post-create', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/saved/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/settings    ', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/signup', express.static(path.join(__dirname, 'dist/mean-angular6')));


// Add API route to endpoint URL
app.use('/api', apiRouter);
app.use('/api/user', apiRouterUser);
app.use('/api/profile', apiRouterProfile);
app.use('/api/redditapi', apiReddit);
app.use('/api/assets', apiRouterAssets);
app.use('/api/comment', apiRouterComment);
app.use('/api/savedPost', apiRouterSavePost);
app.use('/api/follow', apiRouterFollow);

// Books route
app.use('/books', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-details/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-create', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-edit/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/api/books', apiRouter); // Book api route

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
  console.log("Debug : aap.js60."+err.status);
});

cron.schedule('* * * * *', () => {
  redditJob.pop();
  redditJob.news();
  redditJob.createUsers();
});

module.exports = app;
