onload = initializeComponents;

function initializeComponents(){
	centerContainer();
}

function centerContainer(){
	if($( window ).width()>=600){
		$('.form-container').css({
			'position' : 'absolute',
			'left' : '50%',
			'top' : '50%',
			'margin-left' : -$('.form-container').outerWidth()/2,
			'margin-top' : -$('.form-container').outerHeight()/2+20
		});
	}
}

$(function() {
    $(".submit-button").click(function() {
		var invalid = true;
		if(!$("input[name='name']")[0].value.match(/^[a-zA-Z]{2,3}[0-9]{2}$/i)){
			invalid = false;
			$("#invalidName").removeClass('hidden');
		}
		else{
			$("#invalidName").addClass('hidden');
		}
		if($("input[name='password']")[0].value.length<5){
			invalid = false;
			$("#invalidPass").removeClass('hidden');
		}else{
			$("#invalidPass").addClass('hidden');
		}
		
		if(invalid){
			invalid = validateCredentials();
		}
		return invalid;
	});
});

function validateCredentials(){
	var params = "name="+$("#name").val()+"&password="+$("#password").val();

	try{
		var async = new XMLHttpRequest();
		async.onload = function () {
			if (async.readyState==4 && async.status == 200){
				if(async.responseText=="true"){
					$("#invalidName").addClass('hidden');
					$("#invalidPass").addClass('hidden');
				}else if(async.responseText=="user"){
					$("#invalidName").removeClass('hidden');
				}else if(async.responseText=="pass"){
					$("#invalidPass").removeClass('hidden');
				}
			}
		}
		async.open("post", "validation.php", false);
		async.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		async.send(params);
	}catch(exception){
		alert(exception+" Request Failed. Please try again.");
	}
	
	if($("#invalidName").hasClass("hidden") && $("#invalidPass").hasClass("hidden")){
		$("#form").attr("action", "main.html?"+$("#name").val());
		return true;
	}else{
		return false;
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> 9f35206a00d4362270a298faab2a3eaa88fa6962
