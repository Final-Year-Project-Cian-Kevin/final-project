var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

// Import logger to handle server logging. 
var logger = require("../config/serverlogger").Logger
//require multer for the file uploads
var multer = require('multer');

// set the directory for the uploads to the uploaded to
var DIR = './assets/';

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({
  dest: DIR
}).single('photo');

/* GET home page. */
router.get('/images/:id', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/../assets/' + req.params.id));
});


/** 
 * Upload a file to the server
 * returns the file name used to access the image
 */
router.post('/', function (req, res, next) {
  var path = '';

  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      //console.log(err);
      logger.error("[File upload] :" + err);
      return res.status(422).send("An Error occured uploading a file")
    }
    // No error occured.
    logger.info("[File upload] : image " + req.file.filename + "uploaded to server");
    return res.send({
      image: req.file.filename
    });


  });
})
module.exports = router;
