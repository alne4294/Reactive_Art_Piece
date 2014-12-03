// Include libraries here
var express = require('express');
var mongo = require('mongoskin');

// Set up variables here
var serverPort = 8000;
var server = express();
var db = mongo.db("mongodb://readuser:ReadUserPassword@ds051980.mongolab.com:51980/soundtest", {native_parser:true});

// Set up the server
server.engine('.html', require('ejs').__express);
server.set('views', __dirname);
server.use('/assets', express.static(__dirname + '/assets'));
server.set('view engine', 'html');


server.get('/', function(req, res) {
	
    db.collection('noise').findOne({},{ "noise.level": true}, function(err, result) {		
		JSON.stringify(result);
		volume = result['noise']['level'];
		res.render("index.html", volume); 
	});
});

// Start the server
server.listen(serverPort);
console.log('listening on port ' + serverPort);
