<?php
	session_start();
	
	//$name = 'kjk03';
    //$password = 'kareemisawesome';
	
	$name = $_POST['name'];
	$password = $_POST['password'];

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
    $mysql_table = 'account';

	$dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname", $mysql_username, $mysql_password);
	
	/*** set the error mode to excptions ***/
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	//to encode special characters
	$name = $dbh->quote($name);
	
    /*** check for user ***/
    $result = $dbh->query("SELECT *
                            FROM $mysql_table
                            WHERE username = ".$name);

    if ($result->rowCount() > 0) {
    //User exists
    //check password
        $result->execute();
        $result = $result->fetchAll();

        if($result[0]['password'] == $password){
			//if the credentials are correct then start a session with the users name
			$_SESSION["user"]=$_POST['name'];
            echo("true");
        }
        else {
            echo("pass");
        }
    }
    else {
        echo("user");
    }
?>
