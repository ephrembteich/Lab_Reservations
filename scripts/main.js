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
			$("#invalidName").removeClass('hide');
		}
		else{
			$("#invalidName").addClass('hide');
		}
		if($("input[name='password']")[0].value.length<5){
			invalid = false;
			$("#invalidPass").removeClass('hide');
		}else{
			$("#invalidPass").addClass('hide');
		}
		return invalid;
	});
});