var express = require('express');
var router = express.Router();
var Book = require('../models/Book.js');
var passport = require('passport');
require('../config/passport')(passport);

/**
 * Create router to add new book ===================> change to post
 * User must be authorized
 */
router.post('/book', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  // rETRIEVE Token from header
  var token = getToken(req.headers);
  console.log("DEBUG ADDING BOOK using/book ========================");
  if (token) { // check if user is authorised
    // DEBUG
    console.log(req.body);
    console.log("DEBUG ADDING BOOK is token");
    var newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      published_year: req.body.published_year,
      publisher: req.body.publisher
    });

    newBook.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Book(Post) failed to save.'
        });
      }
      res.json({
        success: true,
        msg: 'Successful created new book(Post).'
      });
    });
  } else {
    console.log("DEBUG ADDING BOOK is not token");

    return res.status(403).send({
      success: false,
      msg: 'Unauthorized to upload.'
    });
  }
});

/**
 * Create router to get list of all books ===================> change to post
 * User must be authorized
 */
router.get('/book', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});

/* Return home hope and GET ALL BOOKS */
router.get('/', function (req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
    //res.send('Recieved from api');
  //  console.log('DEBUG- Rouuter . get /homepage');
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : book js get /");  //blue cmd

  });
});
/* GET home page. Test api*/
//router.get('/', function(req, res, next) {
// res.sendStatus('Recieved from api');
//});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function (req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log("DEBUG ADDING BOOK using/========================");

  });
});

/* UPDATE BOOK */
router.put('/:id', function (req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function (req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// export router as module
module.exports = router;
