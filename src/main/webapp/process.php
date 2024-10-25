<?php

$order_id = "1234";
$merchant_id = "1227672";
$name = $_POST["name"];
$price = $_POST["price"];
$currency = "LKR";
$merchant_secret = "NDEzNzAxNjE1NzM2NzQwNTg5NDkzMDk5NDY1OTQ3MzU2MjI0NDc1Nw==";
$hash = strtoupper(
    md5(
        $merchant_id .
        $order_id .
        number_format($price, 2, '.', '') .
        $currency .
        strtoupper(md5($merchant_secret))
    )
);

$obj = new stdClass();
$obj->order_id = $order_id;
$obj->merchant_id = $merchant_id;
$obj->name = $name;
$obj->price = $price;
$obj->currency = $currency;
$obj->hash = $hash;

echo json_encode($obj);

?>