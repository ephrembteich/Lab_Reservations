<?php
	session_start();

	//this if checks if the same user is registered in the session. If true, then return 'true', else return 'false'
	if(isset($_POST["username"])){
		if(!isset($_SESSION["user"])){
			echo "false";
		}elseif($_SESSION["user"]!=$_POST["username"]){
			echo "false";
		}else{
			echo "true";
		}
	}
?>
