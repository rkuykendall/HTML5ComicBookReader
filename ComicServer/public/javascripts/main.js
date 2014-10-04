
function initMain(){
	$("#expand-side-bar").click(function(){
		$(".side-bar").toggleClass("transition-out");
		$("#main").toggleClass("show-side-bar");
	});
}
