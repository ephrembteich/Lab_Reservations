<?php

    /*** if we are here the data is valid and we can insert it into database ***/

    $keyword = $_POST['keyword'];

//    $keyword = "9";
    /*** connect to database ***/
    /*** mysql hostname ***/
    $mysql_hostname = 'localhost';

    /*** mysql username ***/
    $mysql_username = 'root';

    /*** mysql password ***/
    $mysql_password = 'mypass';
	//$mysql_password = 'admin';

    /*** database name ***/
    $mysql_dbname = 'lab_reservation';

    /*** table name ***/
    $mysql_table = 'eventcalendar';


    $dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname", $mysql_username, $mysql_password);

    /*** set the error mode to excptions ***/
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /*** check for reservations ***/
    $result = $dbh->query("SELECT Title, Lab, eventDate, eventStart, addedBy
                           FROM $mysql_table
                           WHERE Title LIKE '%$keyword%'
                           OR Lab LIKE '%$keyword%'
                           OR eventDate LIKE '%$keyword%'
                           OR addedBy LIKE '%$keyword%'
                           ORDER BY eventDate ASC");

    $result->execute();
    $result = $result->fetchAll(PDO::FETCH_ASSOC);

    $result = json_encode($result);
    print_r($result);
?>
