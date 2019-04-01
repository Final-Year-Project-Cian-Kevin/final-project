/**
 * @swagger
 * definition:
 *   book:
 *     properties:
 *       isbn:
 *         type: string
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       description:
 *         type: string
 *       published_year:
 *         type: string
 *       publisher:
 *         type: string
 */

// This routing file was used during early devlopement to test the capability of the 'MEAN' stack
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
    console.log("DEBUG ADDING BOOK is token");

    // Setup the new book entry using the book schema
    var newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      published_year: req.body.published_year,
      publisher: req.body.publisher
    });

    // Save the new book entry using the book schema 
    newBook.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Book(Post) failed to save.' // Return message to user
        });
      }
      res.json({
        success: true,
        msg: 'Successful created new book(Post).' // Return message to user
      });
    });
  } else {
    console.log("DEBUG ADDING BOOK is not token");

    //inform the user they don't have access
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
  // if user is logged in then give them the book they're looking for
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
    // If the user isn't logged in then inform them they're not authorized to view the book
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});

/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - books
 *     description: Returns all books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of books
 *         schema:
 *           $ref: '#/definitions/book'
 */
router.get('/', function (req, res, next) {
  // Using the book schema to return all book entries in the book collection
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
    //res.send('Recieved from api');
  //  console.log('DEBUG- Rouuter . get /homepage');
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : book js get /");  //blue cmd

  });
});

/**
 * @swagger
 * /api/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: The book ID
 *     tags:
 *       - books
 *     description: Returns all books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of books
 *         schema:
 *           $ref: '#/definitions/book'
 */
router.get('/:id', function (req, res, next) {
  // Using hte book schema to find a single book matching the book with the given id
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /api:
 *   post:
 *     tags:
 *       - books
 *     description: Creates a new book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/book'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', function (req, res, next) {
  // Using the book schema to create a new book in the book collection in mongoDB 
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /api/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: The book ID
 *     tags:
 *       - books
 *     description: Save a book into the mongoDB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Book updated
 *         schema:
 *           $ref: '#/definitions/book'
 */
router.put('/:id', function (req, res, next) {
  // Using the book schema to find and update a book that matches the given id
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /api/{id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: The book ID
 *     tags:
 *       - books
 *     description: Delete a book into the mongoDB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Book updated
 *         schema:
 *           $ref: '#/definitions/book'
 */
router.delete('/:id', function (req, res, next) {
  // Using the book schema to find and remove a book that matches the given id
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// export router as module
module.exports = router;