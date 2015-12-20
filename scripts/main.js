var currentLab = "";
var requestedTitle = "";

onload = initializeComponents;

function initializeComponents(){
	checkUser();
	$(window).resize(responsive);
	setURLParameter();
	initializeCalendar();
	$("#signout").click(signOut);
	showWeekly();
	$("#weekltbtn").click(function(){
		$("#weekltbtn").css({"backgroundColor":"#97D35A"});
		$("#monthlybtn").css({"backgroundColor":"#8F9EAC"});
		showWeekly();
	});
	$("#monthlybtn").click(function(){
		$("#weekltbtn").css({"backgroundColor":"#8F9EAC"});
		$("#monthlybtn").css({"backgroundColor":"#97D35A"});
		showMonthly();
	});
}

function checkUser(){
	if(location.search==""){
		location.replace("index.html");
	}else{
		var param = encodeURIComponent(location.search.substring(1));
		try{
			$.post( "secured.php", {username: param}).done(function(data) {
				if(data=="false"){
					location.replace("index.html");
				}
			});
		}catch(exception){
			alert(exception+" Request Failed. Please try again.");
		}
	}
}

function setURLParameter(){
	var sPageURL = location.search.substring(1);
	$("#username").html("Hello, "+sPageURL+"!");
}

function responsive(){
	$("#leftmenu").width($(window).width() - '480');
}

function showWeekly(){
	$("#inject").attr("class", "");
	$("#monthlyview").attr("class","hidden");
	$("#maintable").attr("class","");
}

function showMonthly(){
	$("#inject").attr("class", "maincells");
	$("#maintable").attr("class","hidden");
	$("#monthlyview").attr("class","");
}

function signOut(){
	var user = location.search.substring(1);
	try{
		$.post( "deletesession.php", {'delete': user});
	}catch(exception){
		alert(exception+" Request Failed. Please try again.");
	}
	location.replace("index.html");
}

function getWeekReservations(lab){
	currentLab = encodeURIComponent(lab);
	
	try{
		$.post( "getReservations.php", {'lab': lab, 'day': pressedDate, 'month': monthNum, 'year': yearNum}).done(function(data) {
				fillTable(JSON.parse(data));
			});
	}catch(exception){
		alert(exception+" Request Failed. Please try again.");
	}
}

function fillTable(data){
	for(var i=0; i<data.length; i++){
		for(var j=0; j<data[i].length; j++){
			var hour = data[i][j].hour.split(":")[0];
			var name = data[i][j].name;
			var title = data[i][j].title;
			var div = $("<div>", {"html": name+", "+title});
			$("#r"+hour).find("td").index(i+1).append(div);
		}
	}
}

function prereserve(ele){
	if($(ele).children().length){
		bootbox.alert("The lab is reserved at this time.");
	}else{
		bootbox.prompt("Input the title of this reservation.", function(result) {
			reserve(result);
		});
	}
}

function reserve(title){
	var name = encodeURIComponent(location.search.substring(1));
	title = encodeURIComponent(title);

	try{
		$.post( "reserve.php", {'name': name, 'title': title,'lab': lab, 'day': pressedDate, 
			'month': monthNum, 'year': yearNum}).done(function(data) {
				getWeekReservations(currentLab);
			});
	}catch(exception){
		alert(exception+" Request Failed. Please try again.");
	}
}