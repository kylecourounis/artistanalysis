function addButtonClick() {
  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";

    if (getElement("artists").style.display === "block") {
      getElement("popup-container").innerHTML = getSnippet("add-artist");
    } else if (getElement("categories").style.display === "block") {
      getElement("popup-container").innerHTML = getSnippet("add-category");
    } else if (getElement("videos").style.display === "block" && getElement("songs").style.display === "none") {
      getElement("popup-container").innerHTML = getSnippet("add-video");
    } else {
      getElement("popup-container").innerHTML = getSnippet("add-song");
    }
  }, 400);
}

function backButtonClick() {
  if (getElement("categories").style.display === "block") {
    getElement("categories").style.display = "none";
    getElement("button-back").style.display = "none";

    getElement("button-debug").style.display = "block";
    getElement("artists").style.display = "block";

    // console.log("Back Clicked ('categories' = block)");
  } else if (getElement("songs").style.display === "block") {
    getElement("songs").style.display = "none";
    getElement("videos-list").style.display = "none";
    getElement("button-save").style.display = "none";
    
    getElement("button-back").style.display = "block";
    getElement("button-add").style.display = "block";
    getElement("categories").style.display = "block";

    // console.log("Back Clicked ('songs' = block)");
  } else if (getElement("videos").style.display === "block") {
    getElement("videos").style.display = "none";
    getElement("videos-list").style.display = "none";
    getElement("button-debug").style.display = "none";

    getElement("button-back").style.display = "block";
    getElement("songs").style.display = "block";
    getElement("songs-list").style.display = "inline-table";

    // console.log("Back Clicked ('videos' = block)");
  } else if (getElement("video-container").style.display === "block" && getElement("videos").innerHTML === '<table class="custom-tbl" id="videos-list" width="100%"></table>') {
    getElement("video-container").innerHTML = "";

    getElement("video-container").style.display = "none";
    getElement("button-save").style.display = "none";

    getElement("button-add").style.display = "block";
    getElement("songs").style.display = "block";
    getElement("songs-list").style.display = "inline-table";

    // console.log("Back Clicked ('video-container' = block & innerHTML empty)");
  } else if (getElement("video-container").style.display === "block") {
    getElement("video-container").innerHTML = "";

    getElement("video-container").style.display = "none";
    getElement("button-save").style.display = "none";

    getElement("button-add").style.display = "block";
    getElement("videos").style.display = "block";
    getElement("videos-list").style.display = "inline-table";

    // console.log("Back Clicked ('video-container' = block)");
  }
}

function debugButtonClick() {
  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";
    getElement("popup-container").innerHTML = getSnippet("debug-menu");
  }, 400);
}

function saveButtonClick() {
  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";
    
    var notes = getElement("notes-section").value;
    localStorage.setItem(videoId + "-notes", notes);
  }, 400);
}

function closePopup() {
  getElement("popup-container").innerHTML = "";
  getElement("loader").style.display = "none";
}

function glow(where) {
	var offset = $("#" + where + "").offset();
	var width = $("#" + where + "").width();
  getElement("glow").style.left = offset.left - ((80-width) / 2) + 'px';
  
	var height = $("#" + where + "").height();
	getElement("glow").style.top = offset.top - ((80-height) / 2) + 'px';
	getElement("glow").style.display = "block";
}

function noGlow() {
	getElement("glow").style.display = "none";
}