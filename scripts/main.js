var currentLab = "";
var requestedTitle = "";

onload = initializeComponents;

function initializeComponents(){
	$(window).resize(responsive);
	setURLParameter();
	initializeCalendar();
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

function setURLParameter(){
	var sPageURL = window.location.search.substring(1);
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

function getWeekReservations(lab){
	currentLab = lab;
	var params = encodeURIComponent("lab="+lab+"&day="+pressedDate+"&month="+monthNum+"&year="+yearNum);
	
	try{
		var async = new XMLHttpRequest();
		async.onload = function () {
			if (async.readyState==4 && async.status == 200){
				fillTable(JSON.parse(async.responseText));
			}
		}
		async.open("post", "getReservations.php", true);
		async.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		async.send(params);
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
	var params = encodeURIComponent("name="+(location.search.substring(1))+"&title="+title+
		"&lab="+currentLab+"&day="+pressedDate+"&month="+monthNum+"&year="+yearNum);
	try{
		var async = new XMLHttpRequest();
		async.onload = function () {
			getWeekReservations(currentLab);
		}
		async.open("post", "reserve.php", true);
		async.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		async.send(params);
	}catch(exception){
		alert(exception+" Request Failed. Please try again.");
	}
}