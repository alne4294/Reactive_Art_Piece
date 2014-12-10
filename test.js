var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '104.131.29.34',
  user     : 'eddie',
  password : '123456789',
  database : 'applestock',
});

connection.connect();
var query = connection.query('SELECT * FROM applestock', function(err, result) {
  // Neat!
  console.log(result);
});
//console.log(query); // 

connection.end();