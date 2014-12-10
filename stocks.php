<?php


    
    $format = "l1v";
	$s = file_get_contents("http://finance.yahoo.com/d/quotes.csv?s=AAPL&f=$format&e=.csv");
	$data = explode(",", $s);
   
   print $data[0];
   print ' ';
   print $data[1];

   echo json_encode($data[0],$data[1]);
	/* MONGODB CODE
	// access database
	$db = $conn->test;

	// access collection
	$collection = $db->items2;
    
    $collection->insert($data);
    */        
    //fputcsv($file, $data);


/*function MongoConnect($username, $password, $database, $host) {
    $con = new Mongo("mongodb://{$username}:{$password}@{$host}"); // Connect to Mongo Server
    $db = $con->selectDB($database); // Connect to Database
    // access collection

$collection = $db->Collection;
$collection->insert($myjson)*/


    

//$db->close();
?>
