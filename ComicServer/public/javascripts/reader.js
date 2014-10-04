var images = [];
var done = 0;
var display = 1;
var dir;
var curPanel = 0;


//Generic error handler
function errorHandler(e) {
  console.log("*** ERROR ***");
  console.dir(e);
}

function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

function doError(s) {
  var errorBlock = "<div class='alert alert-block alert-error'>";
  errorBlock += '<button class="close" data-dismiss="alert">&times;</button>';
  errorBlock += "<p>"+s+"</p>";
  errorBlock += "</div>";
  $("#alertArea").html(errorBlock);
}

function doneLoading(){
	console.log("done loading");
    $("#statusModal").modal("hide");
    $(".navbar ul li").show();

    $("#prevPanel").on("click",prevPanel);
    $(document).bind('keydown', 'left', prevPanel);
    $(document).bind('keydown', 'k', prevPanel);

    $("#nextPanel").on("click",nextPanel);
    $(document).bind('keydown', 'right', nextPanel);
    $(document).bind('keydown', 'j', nextPanel);

    $("#fitVertical").on("click",fitVertical);
    $(document).bind('keydown', 'v', fitVertical);

    $("#fitHorizontal").on("click",fitHorizontal);
    $(document).bind('keydown', 'h', fitHorizontal);

    $("#fitBoth").on("click",fitBoth);
    $(document).bind('keydown', 'b', fitBoth);

    $("#fullSpread").on("click",fullSpread);
    $(document).bind('keydown', 'f', fullSpread);

    $("#singlePage").on("click",singleSpread);
    $(document).bind('keydown', 's', singleSpread);

    spread(1); // drawPanel(0);
}


function drawPanel(num) {
  curPanel = num;

  $("#comicImages img").each(function( index ) {
    if (num+index >= images.length || num+index < 0) {
      $(this).hide();
    } else {
      $(this).attr("src",images[num+index].path);
      $(this).show();
    }
  });

  $("#panelCount").html("Panel "+(curPanel+display)+" out of "+images.length);
}

function prevPanel() {
  if(curPanel > 0) drawPanel(curPanel-display);
}

function nextPanel() {
  if(curPanel+display < images.length) drawPanel(curPanel+display);
}

function fitHorizontal() {
  $("#comicImages img").removeClass();
  $("#comicImages img").addClass('fitHorizontal');
}

function fitVertical() {
  $("#comicImages img").removeClass();
  $("#comicImages img").addClass('fitVertical');
}
function fitBoth() {
  $("#comicImages img").removeClass();
  $("#comicImages img").addClass('fitBoth');
}



function singleSpread() { $("#singlePage").parent().hide(); $("#fullSpread").parent().show(); spread(1); }
function fullSpread()   { $("#singlePage").parent().show(); $("#fullSpread").parent().hide(); spread(2); }

function spread(num) {
	
  $('body').removeClass('spread'+display);
  display = num;
  $('body').addClass('spread'+display);

  $("#comicImages").empty();
  for(i=0; i < display; i++) {
    var image = document.createElement("img");
    $("#comicImages").append(image);
  }

  drawPanel(curPanel);
  fitBoth();
}


function init(){
	console.log(comicJson.numPages +" pages loaded");
	if(comicJson.numPages > 0){
		$("#introText").hide();
		for(var i = 1; i<= comicJson.numPages; i++){
		    images.push({loaded:true, path: "/page/"+comicJson.id+"/"+i+"/"});
		}
		doneLoading();
	}
}

$(document).ready( function(){
	init();	
});


