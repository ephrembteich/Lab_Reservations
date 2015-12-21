<?php
	if(isset($_POST['title']) && $_POST['title']!=""){
		session_start();
	
		$lab = intval($_POST['lab']);
		$day = intval($_POST['day']);
		$month = intval($_POST['month']);
		$year = intval($_POST['year']);
		$startTime = $_POST['startTime'];
		$name = $_SESSION['user'];
		$title = $_POST['title'];
	//    $lab = 69;
	//    $day = 25;
	//    $month = 12;
	//    $year = 2015;
		  $startTime = $startTime.":00:00";
	//    $name = "six09";
	//    $title = "cmps 278 final";
		$days = 0;
		$date = $year.$month.$day;
		$dateTime = strtotime("+".$days." days", strtotime($date));
		$date = date("Y-m-d", $dateTime);
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
		// prepare sql and bind parameters
		$result = $dbh->prepare("INSERT INTO $mysql_table (Title, Lab, eventDate, eventStart, addedBy)
								 VALUES(:Title, :Lab, :eventDate, :eventStart, :addedBy)");
		$result->bindParam(':Title', $title);
		$result->bindParam(':Lab', $lab);
		$result->bindParam(':eventDate', $date);
		$result->bindParam(':eventStart', $startTime);
		$result->bindParam(':addedBy', $name);
		$result->execute();
	}
?>