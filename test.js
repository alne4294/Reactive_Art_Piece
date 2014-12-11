var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '104.131.29.34',
  user     : 'ian',
  password : 'mypasswd',
  database : 'applestock',
});

connection.connect();

var query = connection.query('SELECT * FROM applestock', function(err, result) {
  // Neat!
  var price_change = result[0]["pricediff"];
  var volume_change = result[0]["volumediff"];
  console.log(price_change);
  console.log(volume_change);
});
