// Include libraries here
var express = require('express');
var mongo = require('mongoskin');
var Stream = require('user-stream');
var	reddit = require('redwrap');
var mysql  = require('mysql');


// Set up variables here
var serverPort = 8000;
var server = express();
var page;
var tweets = [];
var db = mongo.db("mongodb://readuser:ReadUserPassword@104.236.60.203:27018/sound", {native_parser:true});
var countApple = 0;
var countWoz = 0;
var countMoney = 0;
var numComments = 0;
var downs = 0;
var ups = 0;
var title = "";
var price_change = 0;
var volume_change = 0;

var connection = mysql.createConnection({
  host     : '104.131.29.34',
  user     : 'ian',
  password : 'mypasswd',
  database : 'applestock',
});

connection.connect();

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

reddit.r('Apple', function(err, data, res){
	title = data.data.children[0].data.title; //outputs object representing first page of Apple subreddit

	//Image 3 vals
	countApple = 0;
	countWoz = 0;
	countMoney = 0;
	for (var i = 0; i<data.data.children.length; i++){
		var selftext = data.data.children[i].data.selftext.toLowerCase();
		if (selftext.indexOf('apple') > -1){
			countApple += 1;
		}
		if (selftext.indexOf('wozniak') > -1 || selftext.indexOf('woz') > -1){
			countWoz += 1;
		}
		if (selftext.indexOf('money') > -1){
			countMoney += 1;
		}
	}

	// Image 4 vals
	numComments = 0;
	downs = 0;
	ups = 0;
	for (var i = 0; i<data.data.children.length; i++){
		numComments += data.data.children[i].data.num_comments;
		downs += data.data.children[i].data.downs;
		ups += data.data.children[i].data.ups;
	}
});

stream.on('data', function(json) {
	tweets.push(json);
});

server.get('/', function(req, res) {
	res.render("index.html");
});

//Image 5 (stock)

/*$.get("stocks.php",{param:value},callbackFunction);
callbackFunction(data)
{
alert(data);
} */


server.get('/twitter', function(req, res) {
	res.send(tweets);
});

server.get('/reddit', function(req, res){
	var reddit_data = 
	{
		"countApple":countApple, 
		"countWoz":countWoz,
		"countMoney":countMoney,
		"numComments":numComments,
		"downs":downs,
		"ups":ups,
		"title":title,
	}
	res.send(reddit_data);
});

server.get('/sound', function(req, res) {
	db.collection('noise').find({location: "microphone" }).sort({"date": -1}).limit(1).toArray(function(err, result) {
		// console.log(result);
		var volume = result[0]['noise']['level'];
		var frequency = result[0]['frequency']['values'];
		res.send({volume: volume, frequencies: frequency});
	});
});

server.get('/stocks', function(req, res) {

var query = connection.query('SELECT * FROM applestock', function(err, result) {
  
	if (result != undefined){
	  price_change = result[0]["pricediff"];
	  volume_change = result[0]["volumediff"];
	} else{
		console.log("price data undefined");
		price_change = 0;
		volume_change = 0;
	}
	res.send({price_change: price_change, volume_change: volume_change});
	});
});

// Start the server
server.listen(serverPort);
console.log('listening on port ' + serverPort);