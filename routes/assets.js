var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

//require multer for the file uploads
var multer = require('multer');

// set the directory for the uploads to the uploaded to
var DIR = './assets/';

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');

/* GET home page. */
router.get('/images/:id', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../assets/' + req.params.id));
});


//our file upload function.
router.post('/', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  
      // No error occured.
       path = req.file.path;
       return res.send("Upload Completed for "+path); 
 });     
})
module.exports = router;