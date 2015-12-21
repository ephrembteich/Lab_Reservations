var currentLab = "114";
var flag2 = true;

onload = initializeComponents;

function initializeComponents(){
	checkUser();
	$(window).resize(responsive);
	setURLParameter();
	initializeCalendar();
	initializeMainTable();
	getWeekReservations($("#btnpressed").html().split(" ")[1]);
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
	$("#maintable").attr("class","");
	$("#monthlyview").attr("class","hidden");
}

function showMonthly(){
	$("#inject").attr("class", "maincells");
	$("#maintable").attr("class","hidden");
	$("#searchtable").attr("class", "hidden");
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

function initializeMainTable(){
	$("#maintable").empty();
	var clock = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];
	var tbody = $("<tbody>");
	for(var i=0; i<12; i++){
		var tr = $("<tr>", {"id": "r"+clock[i]});
		var maintd = $("<td>", {"class": "maincells width80 color728398 txtaligncenter", 
			"html": clock[i]+":00 "+(i<4?"AM":"PM")});
		tr.append(maintd);
		for(var j=0; j<6; j++){
			var td = $("<td>", {"name": days[j], "class": "height38 maincells", });
			td.click(prereserve);
			tr.append(td);
		}
		tbody.append(tr);
	}
	$("#maintable").append(tbody);
}

function getWeekReservations(lab){
	if(lab==currentLab && flag2){
		flag2 = false;
		return;
	}
	initializeMainTable();
	currentLab = encodeURIComponent(lab);
	if($(event.target).attr("type")=="button"){
		$("#btnpressed").attr("id", "");
		$(event.target).attr("id", "btnpressed");
	}

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
		var weekday = data[i].dayOfWeek;
		var title = decodeURIComponent(data[i].Title);
		var hour = parseInt((data[i].eventStart).split(":")[0]);
		var name = data[i].addedBy;
		var div = $("<div>", {"html": name+", "+title, "class": "divcells"});
		var td = $("#r"+hour+" [name='"+weekday+"']");
		var width = td.width();
		var height = td.height();
		if($("#r"+hour+" [name='"+weekday+"']").html()==""){
			$("#r"+hour+" [name='"+weekday+"']").append(div);
		}
		td.width(width);
		td.height(height);
	}
}

function prereserve(){
	var target = $(event.target);
	var colName = $("#weekdays th").eq(target.index()+1).html();
	colName = colName.split(" ");
	if(colName.length==1){
		return;
	}else if($(event.target).html()!=""){
		bootbox.alert("The lab is reserved at this time.");
	}else{
		bootbox.prompt("Input the title of this reservation.", function(result) {
			if(result=="" || result==null) return;
			var st = parseInt(target.parent().attr("id").substring(1));
			var day = parseInt(colName[1].split("-")[1]);
			reserve(st, day, result);
		});
	}
}

function reserve(st, day, title){
	var name = encodeURIComponent(location.search.substring(1));
	title = encodeURIComponent(title);
	
	try{
		$.post( "reserve.php", {'lab': currentLab, 'day': day,'month': monthNum,'year': yearNum,'startTime': st,'name': name,'title': title}).done(function(){
				getWeekReservations($("#btnpressed").html().split(" ")[1]);
			});
	}catch(exception){
		alert(exception+" Request Failed. Please try again.");
	}
}

function promptUser(){
	bootbox.prompt("Input your search keyword.", function(result) {
		if(result=="" || result==null) return;
		searchDatabase(result);
	});
}

function searchDatabase(keyword){
	try{
		$.post( "search.php", {'keyword': keyword}).done(function(data){
			displaySearch(keyword, JSON.parse(data));
		});
	}catch(exception){
		alert(exception+" Request Failed. Please try again.");
	}
}

function displaySearch(keyword, data){
	$("#inject").attr("class", "maincells");
	$("#maintable").attr("class","hidden");
	$("#monthlyview").attr("class","hidden");
	$("#searchtable").attr("class","");
	$("#searchtable").empty();
	
	if(data.length==0){
		$("#searchtable").addClass("noresults txtaligncenter");
		$("#searchtable").html("No results with keyword = \'"+keyword+"\'.");
		return;
	}
	
	$("#searchtable").css("margin-top", "0");
	var table = $("<table>");
	table.attr("id", "searchTable");
	var tbody = $("<tbody>");
	var tr = $("<tr>");
	tr.append($("<th>", {'width': '120px','html': 'Username', 'class': 'thsearch'}));
	tr.append($("<th>", {'width': '583px','html': 'Topic, keyword = \''+keyword+'\'', 'class': 'thsearch'}));
	tr.append($("<th>", {'width': '120px','html': 'Lab', 'class': 'thsearch'}));
	tr.append($("<th>", {'width': '120px','html': 'Date', 'class': 'thsearch'}));
	tr.append($("<th>", {'width': '120px','html': 'Time', 'class': 'thsearch'}));
	tbody.append(tr);
	for(var i=0; i<data.length; i++){
		var back = (i%2==0)?"back1":"back2";
		tr = $("<tr>");
		tr.append($("<td>", {'width': '120px','html': data[i].addedBy, 'class': 'tdsearch '+back}));
		tr.append($("<td>", {'width': '583px','html': decodeURIComponent(data[i].Title), 'class': 'tdsearch '+back}));
		tr.append($("<td>", {'width': '120px','html': data[i].Lab, 'class': 'tdsearch '+back}));
		tr.append($("<td>", {'width': '120px','html': data[i].eventDate, 'class': 'tdsearch '+back}));
		tr.append($("<td>", {'width': '120px','html': data[i].eventStart, 'class': 'tdsearch '+back}));
		tbody.append(tr);
	}
	table.append(tbody);
	$("#searchtable").append(table);
}