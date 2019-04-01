/**
 * @swagger
 * definition:
 *   assets:
 *     properties:
 *       image:
 *         type: string
 */

 // Imported used
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

/**
 * @swagger
 * /api/assets/images:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: The user ID
 *     tags:
 *       - assets
 *     description: Gets an image for a specific user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns a single image
 *         schema:
 *           $ref: '#/definitions/assets'
 */
router.get('/images/:id', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/../assets/' + req.params.id));
});

/**
 * @swagger
 * /api/assets:
 *   post:
 *     tags:
 *       - assets
 *     description: Sends an image file to the for the users profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sets a user image
 *         schema:
 *           $ref: '#/definitions/assets'
 */
router.post('/', function (req, res, next) {
  /** 
   * Upload a file to the server
   * returns the file name used to access the image
   */
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
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

// export router as router
module.exports = router;