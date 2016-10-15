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

function fromUrl(url) {
  var modalString = 'Downloading comic from URL.';
  $("#statusModalText").html(modalString);
  $("#statusModal").modal({keyboard:false});

  console.log('URL = '+url);
  // Get file from library
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onprogress = function(e) {
    var done = e.position || e.loaded;
    var total = e.totalSize || e.total;
    var present = Math.floor(done / total * 100);

    var pString = 'Downloading comic from URL.';
        pString += '<div class="progress progress-striped active">';
        pString += '<div class="bar" style="width: '+present+'%;"></div>';
        pString += '</div>';
        $("#statusModalText").html(pString);
  };
  xhr.onload = function(e) {
    if (this.status == 200) {
      var myBlob = this.response;
      handleFile(myBlob);
    }
  };
  xhr.send();
}

function init() {
  var params = getSearchParameters();

  if(params['url'] !== undefined) {
    fromUrl(params['url']);
  }

  if(params['library'] !== undefined) {
    fromUrl('library/'+params['library']);
  }

  // Upload file
  window.webkitStorageInfo.requestQuota(window.TEMPORARY, 20*1024*1024, function(grantedBytes) {
    window.webkitRequestFileSystem(window.TEMPORARY, grantedBytes, onInitFs, errorHandler);
  }, errorHandler);

}

function onInitFs(fs) {
  dir = fs.root;
  $(document).on("dragover", dragOverHandler);
  $(document).on("drop", dropHandler);
  console.log('onInitFs done, new');
}

function dragOverHandler(e) {
  e.preventDefault();
}


function dropHandler(e) {
  e.stopPropagation();
  e.preventDefault();

  if(!e.originalEvent.dataTransfer.files) return;
  var files = e.originalEvent.dataTransfer.files;
  var count = files.length;

   if(!count) return;

   //Only one file allowed
   if(count > 1) {
     doError("You may only drop one file.");
     return;
   }

   handleFile(files[0]);
 }

function doError(s) {
  var errorBlock = "<div class='alert alert-block alert-error'>";
  errorBlock += '<button class="close" data-dismiss="alert">&times;</button>';
  errorBlock += "<p>"+s+"</p>";
  errorBlock += "</div>";
  $("#alertArea").html(errorBlock);
}

// Dropbox support
options = {
  linkType: "direct",
  success: function(files) {
    handleDropboxFile(files[0].link);
  },
  cancel: function() { }
};


function handleFile(file) {
  console.log(file);
  zip.workerScriptsPath = "js/";

  zip.createReader(new zip.BlobReader(file), function(reader) {
    console.log("Created reader.");
    reader.getEntries(function(entries) {
      console.log("Got entries.");

      $("#introText").hide();

      //Start a modal for our status
      var modalString = 'Parsed the CBZ - Saving Images. This takes a <strong>long</strong> time!';
      $("#statusModalText").html(modalString);
      $("#statusModal").modal({keyboard:false});

      entries.forEach(function(entry) {

        if(!entry.directory && entry.filename.indexOf(".jpg") != -1) {

          //rewrite w/o a path
          var cleanName = entry.filename;
          if(cleanName.indexOf("/") >= 0) cleanName = cleanName.split("/").pop();

          dir.getFile(cleanName, {create:true}, function(file) {
            console.log("Yes, I opened "+file.fullPath);
            images.push({path:file.toURL(), loaded:false})

            entry.getData(new zip.FileWriter(file), function(e) {
              done++;
              var perc = Math.floor((done/images.length)*100);

              var pString = 'Processing images.';
                  pString += '<div class="progress progress-striped active">';
                  pString += '<div class="bar" style="width: '+perc+'%;"></div>';
                  pString += '</div>';
                  $("#statusModalText").html(pString);

              for(var i=0; i<images.length; i++) {
                if(images[i].path == file.toURL()) {
                  images[i].loaded = true;
                  break;
                }
              }

              if(done == images.length) {
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

                var i = null;
                $("body").mousemove(function() {
                    clearTimeout(i);
                    $("#navbar").fadeIn();
                    i = setTimeout('$("#navbar").fadeOut();', 1000);
                }).mouseleave(function() {
                    clearTimeout(i);
                    $("#navbar").hide();
                });

                singleSpread();
              }
            });
          }, errorHandler);
        }
      });
    });
  }, function(err) {
    doError("Sorry, but unable to read this as a CBR file.");
    console.dir(err);
  });
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
  $("#comicImages").removeClass();
  $("#comicImages img").removeClass();
  $("#comicImages img").addClass('fitHorizontal');
}

function fitVertical() {
  $("#comicImages img").removeClass();
  $("#comicImages img").addClass('fitVertical');
  $("#comicImages").addClass('fit');

}
function fitBoth() {
  $("#comicImages img").removeClass();
  $("#comicImages img").addClass('fitBoth');
  $("#comicImages").addClass('fit');
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
