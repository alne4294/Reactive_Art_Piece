Apple Stock
/////////////////////////////////////////
    <?php
    
    <?php
while(1){
    $format = "l1v";
	$s = file_get_contents("http://finance.yahoo.com/d/quotes.csv?s=$stock&f=$format&e=.csv");
	$data = explode(",", $s);
    $price = $data[0];
    $volume = $data[1];
    usleep(60000);
    $format = "l1v";
	$s = file_get_contents("http://finance.yahoo.com/d/quotes.csv?s=$stock&f=$format&e=.csv");
	$data = explode(",", $s);
	$price1 = $data[0];
	$volume1 = $data[1];
 
	$pricediff = $price1 - $price;
	$volumediff = $volume1 - $volume;
 
	// Create connection
	$db = new mysqli('localhost', 'root', '123456789', 'applestock');
	// Check connection
 
	if ($db->connect_errno) {
		die("Connection failed: " . $db->connect_error);
	} 
 
 
	$sql = "INSERT INTO applestock (pricediff, volumediff)
	VALUES ($pricediff, $volumediff)";
 
	if ($db->query($sql)) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $db->error;
	}
 
 
 
}
$db->close();
?>