// Include libraries here
var express = require('express');
var mongo = require('mongoskin');

// Set up variables here
var serverPort = 8000;
var server = express();
//var db = mongo.db("mongodb://localhost/yelp", {native_parser:true});


// Set up the server
server.engine('.html', require('ejs').__express);
server.set('views', __dirname);
server.use('/assets', express.static(__dirname + '/assets'));
server.set('view engine', 'html');


server.get('/', function(req, res) {
  res.render("index.html", {data: 'TEST STRING'});
});

// Start the server
server.listen(serverPort);
console.log('listening on port ' + serverPort);
