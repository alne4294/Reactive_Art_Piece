<?php


    
    $format = "l1";
	$s = file_get_contents("http://finance.yahoo.com/d/quotes.csv?s=AAPL&f=$format&e=.csv");
	$data = explode(",", $s);
   
   print $data[0];
	/* MONGODB CODE
	// access database
	$db = $conn->test;

	// access collection
	$collection = $db->items2;
    
    $collection->insert($data);
    */        
    //fputcsv($file, $data);
    

//$db->close();
?>
