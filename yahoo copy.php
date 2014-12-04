<?php

/**
    Add format/parameters to be fetched
     
  symbol, name, price, prev close, open, bid, ask, mkt cap, PE, EPS, 	
 */


$csv = array_map('str_getcsv', file('sp500tick.csv'));

$stockList = array();

foreach ($csv as $v1) {
	array_push($stockList, $v1);
}


//$file = fopen("quoteInfo.csv","w");
foreach($stockList as $line)
	foreach($line as $stock){
{
    ?> stock = <?php echo $stock; ?>
    <?php
    
    $format = "sl1c1p2xrevwbao";
    usleep(100000);
	$s = file_get_contents("http://finance.yahoo.com/d/quotes.csv?s=$stock&f=$format&e=.csv");
	$data = explode(",", $s);
    $i = 0;
    foreach($data as $ppp){
		$i++;
		 ?> <?php echo $ppp; ?>
    <?php
	}
    
	/*	
	$server = "localhost";
	$user_name = "root";
	$password = “password”;
	$database = "3308stocks";
	*/
	/*
	$db_handle = mysql_connect($server, $user_name, $password);
	$db_found = mysql_select_db($database, $db_handle);

	if ($db_found) {

		$SQL = "INSERT INTO stockdata (ticker, last_trade, change, percent_change, exchange, PE, EPS, volume, 52_week_range, bid, ask, open)
	VALUES (data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11])";

		$result = mysql_query($SQL);
		mysql_close($db_handle);
	}else {
		print "Database NOT Found ";
		mysql_close($db_handle);
	}	

	*/
	
	// Create connection
	$db = new mysqli('localhost', 'root', ‘password’ '3308stocks');
	// Check connection
	
	if ($db->connect_errno) {
		die("Connection failed: " . $db->connect_error);
	} 
	
	//if($data[9] == "N/A") $data[9] = NULL;
	//if($data[10] == "N/A") $data[10] = NULL;

	$sql = "INSERT INTO stockdata (ticker, last_trade, changer, percent_change, exchange, PE, EPS, volume, 52_week_range, bid, ask, open)
	VALUES ($data[0], $data[1], $data[2], $data[3], $data[4], '$data[5]', $data[6], $data[7], $data[8], '$data[9]', '$data[10]', $data[11])";

	if ($db->query($sql)) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $db->error;
	}


	
	
	/* MONGODB CODE
	// access database
	$db = $conn->test;

	// access collection
	$collection = $db->items2;
    
    $collection->insert($data);
    */        
    //fputcsv($file, $data);
    
  }  
}
//fclose($file);
$db->close();
?>
