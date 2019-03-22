/**
 * serverlogger.js is used to implement a basic server logging system.
 * 
*/

// Import the fs library
var fs = require("fs");

// Make logger exportable so any file can reference it
var Logger = (exports.Logger = {});

// Creates folder for logs if one doesn't exsist
if (!fs.existsSync('./logs')){
    fs.mkdirSync('./logs');
}

// Create 3 write streams to allow to append info, error and debug logs to different streams.
var infoStream = fs.createWriteStream("./logs/info.txt");
var errorStream = fs.createWriteStream("./logs/error.txt");
var debugStream = fs.createWriteStream("./logs/debug.txt");

// Append info message to log file along with the current date
Logger.info = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  infoStream.write(message);
};

// Append debug message to log file along with the current date
Logger.debug = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  debugStream.write(message);
};

// Append error message to log file along with the current date
Logger.error = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  errorStream.write(message);
};