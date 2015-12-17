onload = initializeComponents;

function initializeComponents(){
	$(window).resize(responsive);
	initializeCalendar();
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
	
}

function showMonthly(){
	var secdiv = $("div", {"margin": "auto", "text": "Monthly View is not ready yet."});
	$("#inject").append(secdiv);
	console.debug(secdiv.text);
}