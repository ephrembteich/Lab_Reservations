<?php

/*** first check that both the username, password have been sent ***/
if(!isset( $_POST['name'], $_POST['password']))
{
    $message = 'Please enter a valid username and password';
}
else
{

//    $name = 'kjk03';
//    $password = 'kareemisawesome';
    /*** if we are here the data is valid and we can insert it into database ***/
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);

    /*** connect to database ***/
    /*** mysql hostname ***/
    $mysql_hostname = 'localhost';

    /*** mysql username ***/
    $mysql_username = 'root';

    /*** mysql password ***/
    $mysql_password = 'Kkareem_27';

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
            print_r("true");
            return "true";
        }
        else {
            print_r("pass");
            return "pass";
        }
    }
    else {
        print_r("user");
        return "user";
    }

//}
?>

<html>
    <head>
        <title>Login validation</title>
    </head>

    <body>
        <p><?php echo $message; ?>
    </body>
</html>
