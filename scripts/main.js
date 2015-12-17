onload = initializeComponents;

function initializeComponents(){
	$(window).resize(responsive);
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