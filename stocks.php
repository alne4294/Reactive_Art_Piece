//Apple Stock
/////////////////////////////////////////
<?php

while(1){
    $format = "l1v";
        $s = file_get_contents("http://finance.yahoo.com/d/quotes.csv?s=AAPL&f=$format&e=.csv");
        $data = explode(",", $s);
    $price = $data[0];
    $volume = $data[1];
    sleep(1);
    $format = "l1v";
        $ss = file_get_contents("http://finance.yahoo.com/d/quotes.csv?s=AAPL&f=$format&e=.csv");
        $data2 = explode(",", $ss);
        $price1 = $data2[0];
        $volume1 = $data2[1];

        $pricediff = $price1 - $price;
        $volumediff = $volume1 - $volume;
        echo "Volume diff: " . $volumediff ."Price Diff: " . $pricediff ;
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