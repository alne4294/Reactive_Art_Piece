// Include libraries here
var express = require('express');
var mongo = require('mongoskin');
var Stream = require('user-stream');
// Set up variables here
var serverPort = 8000;
var server = express();
var page;
var tweets = [];
var db = mongo.db("mongodb://readuser:ReadUserPassword@ds051980.mongolab.com:51980/soundtest", {native_parser:true});

// Set up the server
server.engine('.html', require('ejs').__express);
server.set('views', __dirname);
server.use('/assets', express.static(__dirname + '/assets'));
server.set('view engine', 'html');

var stream = new Stream({
	consumer_key: 'wFJkc8dUi2y4XtbChF40Kytuf',
	consumer_secret: 'fyeLrMTcj2BM8uIkzK23k3ombdUbjY0atNLjnc1yDc5B33TFTG',
	access_token_key: '398804407-NsODrzPwOn4hMwsawIJLFPaMiTK6YeMdvqsitAHd',
	access_token_secret: '1hInAOIC61TxPAohWSgIvpINsSiPUmlRbNtCRFJTFPC3U'
});

var params = {track: 'cu boulder'};
stream.stream(params);

stream.on('data', function(json) {
	tweets.push(json);
	console.log(json);
});

server.get('/', function(req, res) {
	res.render("index.html");
});


server.get('/twitter', function(req, res) {
	res.send(tweets);
});

server.get('/sound', function(req, res) {
	db.collection('noise').find({},{"sort" : ['date', 'dsc']}).limit(1).toArray(function(err, result) {
		var volume = result[0]['noise']['level'];
		var frequency = result[0]['frequency']['values'];
		res.send({volume: volume, frequencies: frequency});
	});
});


// Start the server
server.listen(serverPort);
console.log('listening on port ' + serverPort);