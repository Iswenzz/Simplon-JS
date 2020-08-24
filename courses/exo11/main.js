$(document).ready(() =>
{
	$("#content").css({ 
		padding: "2em",
		border: "solid 2px black"
	});
	const contentBoxs = $("#content > div");
	contentBoxs.addClass("dashes");
	contentBoxs.click(function()
	{ 
		$(this).toggleClass("bg-primary"); 
	});
});
