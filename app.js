var express = require('express');
var async = require('async');
var app = express();

var mongo = require('mongoskin');

//var db = mongo.db("mongodb://localhost/yelp", {native_parser:true});

app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

app.get('', function(req, res) {
  res.render("views/index.html");
});

app.listen(8000);
console.log('listening on port 8000');
