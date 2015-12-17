function initializeCalendar(){
	changedate();
	$("#showCurrentDate").click(changedate);
}

/***************************************************************************************
	Calendar
	Credits to @Ephrem_Bteich
***************************************************************************************/

var thisDate = 1;							// Tracks current date being written in calendar
var wordMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var today = new Date();							// Date object to store the current date
var todaysDay = today.getDay() + 1;					// Stores the current day number 1-7
var todaysDate = today.getDate();					// Stores the current numeric date within the month
var todaysMonth = today.getUTCMonth() + 1;				// Stores the current month 1-12
var todaysYear = today.getFullYear();					// Stores the current year
var monthNum = todaysMonth;						// Tracks the current month being displayed
var yearNum = todaysYear;						// Tracks the current year being displayed
var firstDate = new Date(String(monthNum)+"/1/"+String(yearNum));	// Object Storing the first day of the current month
var firstDay = firstDate.getUTCDay();					// Tracks the day number 1-7 of the first day of the current month
var lastDate = new Date(String(monthNum+1)+"/0/"+String(yearNum));	// Tracks the last date of the current month
var numbDays = 0;
var calendarString = "";
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function changedate(buttonpressed) {
	$("tr").remove(".rmv");
	$("#daytbr").attr("class", "");
	$("#tbr").attr("class", "daycolor2 centerVH width32 height32");
	$("#daytbr").find("span").attr("class", "hidden");
	
	if (buttonpressed == "prevmo") monthNum--;
	else if (buttonpressed == "nextmo") monthNum++;
	else  if (buttonpressed == "return") { 
		monthNum = todaysMonth;
		yearNum = todaysYear;
	}

	if (monthNum == 0) {
		monthNum = 12;
		yearNum--;
	}else if (monthNum == 13) {
		monthNum = 1;
		yearNum++
	}

	lastDate = new Date(String(monthNum+1)+"/0/"+String(yearNum));
	numbDays = lastDate.getDate();
	firstDate = new Date(String(monthNum)+"/1/"+String(yearNum));
	firstDay = firstDate.getDay() + 1;
	createCalendar();
	responsive();
	return;
}

function createCalendar() {
	var daycounter = 0;
	thisDate == 1;
	var bool = true;
	$("#inputmonthyear").html(monthNames[monthNum-1]+", "+yearNum);
	
	if ((!(yearNum % 4) && yearNum % 100) || !(yearNum % 400)) {
		daysInMonth[1] = 29;
	}else{
		daysInMonth[1] = 28;
	}

	for (var i = 1; i <= 6; i++) {
		if(bool){
			var tr = $("<tr>");
			tr.attr("class", "rmv");
			for (var x = 1; x <= 7; x++) {
				if (daycounter+1 > daysInMonth[monthNum-1]){
					bool=false;
					//break;
				}
				daycounter = (thisDate - firstDay)+1;
				thisDate++;
				if ((daycounter > numbDays) || (daycounter < 1) || (daycounter>daysInMonth[monthNum-1])) {
					var td = $("<td>", {"class": "daycolor width32 centerVH height28 defaultcursor"});
					tr.append(td);
				} else {
					var td = $("<td>", {"class": "daycolor width32 centerVH height28 tdstyle pointer", "text":daycounter});
					if(x!=1){
						td.click(changeColor);
					}
					if(todaysDate==daycounter){
						td.attr("id", "today");
					}
					tr.append(td);
				}
			}
			tr.insertBefore($("#showCurrentDate").parent());
		}
	}
	thisDate = 1;
	updateWeekdays($("#today"));
}

function changeColor(){
	if($("#tdcoloring")){
		$("#tdcoloring").attr("id", "");
	}
	if($("#tbr")){
		$("#tbr").attr("class", "daycolor2 centerVH width32 height32");
		$("#tbr").attr("id", "");
	}
	
	$(event.target).attr("id", "tdcoloring");
	var dayIndex = $(event.target).index();
	var day = $("#caltable tr").eq(1).find("td").eq(dayIndex);
	day.attr("class", day.attr("class")+" color60C4E9");
	day.attr("id", "tbr");
	updateWeekdays($(event.target));
}

function updateWeekdays(target){
	if($("#daytbr")){
		$("#daytbr").attr("class", "");
		$("#daytbr").attr("id", "");
	}
	if($("#tbrborder")){
		$("#tbrborder").attr("id", "");
	}
	
	var p = target.parent().find("td");
	var weekday = $("#weekdays th");
	for(var i=1; i<p.length; i++){
		if(p.eq(i).html()!=""){
			weekday.eq(i).html(weekday.eq(i).attr("value")+" "+monthNum+"-"+p.eq(i).html());
		}else{
			weekday.eq(i).html(weekday.eq(i).attr("value"));
		}
		if(p.eq(i).html()==target.html()){
			weekday.eq(i).html(weekday.eq(i).html()+" (TODAY)");
			weekday.eq(i).attr("class", weekday.eq(i).attr("class")+" color60C4E9");
			weekday.eq(i).attr("id", "daytbr");
			$("#8 [name="+(days[weekday.eq(i).index()-1])+"]").attr("id", "tbrborder");
		}
	}
}