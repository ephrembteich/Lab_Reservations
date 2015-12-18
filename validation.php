<?php

/*** first check that both the username, password have been sent ***/
if(!isset( $_POST['user'], $_POST['password']))
{
    $message = 'Please enter a valid username and password';
}
/*** check the username is 8-20 characters long, has no _ or . at the beginning, has no __ or _. or ._ or .. inside, has no _ or . at the end ***/
elseif (preg_match('/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/', $_POST['user']) != true)
{
    /*** if there is no match ***/
    $message = "Username not allowed, username must only contain alphanumeric characters, underscore and dot/n Underscore and dot can't be at the end or start of a username/n Underscore and dot can't be next to each other/n Underscore or dot can't be used multiple times in a row";
}
/*** check the password has only alpha numeric characters ***/
elseif (preg_match('/^[a-zA-Z]\w{3,14}$/', $_POST['password']) != true)
{
        /*** if there is no match ***/
        $message = "The password's first character must be a letter, it must contain at least 4 characters and no more than 15 characters and no characters other than letters, numbers and the underscore may be used";
}
else
{
    /*** if we are here the data is valid and we can insert it into database ***/
    $user = filter_var($_POST['user'], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);

    /*** now we can encrypt the password ***/
    $password = sha1( $password );

    /*** connect to database ***/
    /*** mysql hostname ***/
    $mysql_hostname = 'localhost';

    /*** mysql username ***/
    $mysql_username = 'mysql_username';

    /*** mysql password ***/
    $mysql_password = 'mysql_password';

    /*** database name ***/
    $mysql_dbname = 'mysql_dbname';

    try
    {
        $dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname", $mysql_username, $mysql_password);
        /*** $message = a message saying we have connected ***/

        /*** set the error mode to excptions ***/
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        /*** prepare the insert ***/
        $stmt = $dbh->prepare("INSERT INTO phpro_users (user, password ) VALUES (:user, :password )");

        /*** bind the parameters ***/
        $stmt->bindParam(':user', $user, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR, 40);

        /*** execute the prepared statement ***/
        $stmt->execute();

        /*** unset the form token session variable ***/
        unset( $_SESSION['form_token'] );

        /*** if all is done, say thanks ***/
        $message = 'New user added';
    }
    catch(Exception $e)
    {
        /*** check if the username already exists ***/
        if( $e->getCode() == 23000)
        {
            $message = 'Username already exists';
        }
        else
        {
            /*** if we are here, something has gone wrong with the database ***/
            $message = 'We are unable to process your request. Please try again later"';
        }
    }
}
?>

<html>
    <head>
        <title>Login validation</title>
    </head>

    <body>
        <p><?php echo $message; ?>
    </body>
</html>
