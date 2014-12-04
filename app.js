// Include libraries here
var express = require('express');
var mongo = require('mongoskin');
// Set up variables here
var serverPort = 8000;
var server = express();

var page;

var Stream = require('user-stream');

var db = mongo.db("mongodb://readuser:ReadUserPassword@ds051980.mongolab.com:51980/soundtest", {native_parser:true});
// Set up the server
server.engine('.html', require('ejs').__express);
server.set('views', __dirname);
server.use('/assets', express.static(__dirname + '/assets'));
server.set('view engine', 'html');


var tweets = []

		var stream = new Stream({
			consumer_key: 'wFJkc8dUi2y4XtbChF40Kytuf',
			consumer_secret: 'fyeLrMTcj2BM8uIkzK23k3ombdUbjY0atNLjnc1yDc5B33TFTG',
			access_token_key: '398804407-NsODrzPwOn4hMwsawIJLFPaMiTK6YeMdvqsitAHd',
			access_token_secret: '1hInAOIC61TxPAohWSgIvpINsSiPUmlRbNtCRFJTFPC3U'
		});

		var params = {
			track: 'cu boulder'
		}
		stream.stream(params);


		stream.on('data', function(json) {
			tweets.push(json)	
			console.log(json);

		});



server.get('/', function(req, res) {
	db.collection('noise').findOne({},{}, function(err, result) {
		JSON.stringify(result);
		volume = result['noise']['level'];
		frequency = result['frequency']['values'];

		res.render("index.html", {volume: volume, frequencies: frequency});
	});
});


server.get('/twitter', function(req, res) {
	res.send(tweets);
});




// Start the server
server.listen(serverPort);
console.log('listening on port ' + serverPort);