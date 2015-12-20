<?php
	session_start();
	
	//this if deletes a user session upon signout
	if(isset($_POST["delete"])){
		if(isset($_SESSION["user"])){
			unset($_SESSION["user"]);
			echo "true";
		}else{
			echo "false";
		}
	}
?>