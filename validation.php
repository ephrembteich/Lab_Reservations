<?php

    $name = 'kjk03';
    $password = 'kareemisawesome';
    /*** if we are here the data is valid and we can insert it into database ***/
//    $name = $_POST['name'];
//    $password = $_POST['password'];

    /*** connect to database ***/
    /*** mysql hostname ***/
    $mysql_hostname = 'localhost';

    /*** mysql username ***/
    $mysql_username = 'root';

    /*** mysql password ***/
    $mysql_password = 'admin';

    /*** database name ***/
    $mysql_dbname = 'lab_reservation';

    /*** table name ***/
    $mysql_table = 'account';


    $dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname", $mysql_username, $mysql_password);

    /*** set the error mode to excptions ***/
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /*** check for user ***/
    $result = $dbh->query("SELECT *
                            FROM $mysql_table
                            WHERE username = '".$name."'");

    if ($result->rowCount() > 0) {
    //User exists
    //check password
        $result->execute();
        $result = $result->fetchAll();

        if($result[0]['password'] == $password){
            return "true";
        }
        else {
            return "pass";
        }
    }
    else {
        return "user";
    }
?>
