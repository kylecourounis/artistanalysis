function addButtonClick() {
  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";

    if (getElement("videos").style.display === "block" && getElement("songs").style.display === "none") {
      getElement("popup-container").innerHTML = getSnippet("add-video");
    } else {
      getElement("popup-container").innerHTML = getSnippet("add-song");
    }
  }, 400);
}

function backButtonClick() {
  if (getElement("videos").style.display === "block") {
    getElement("videos").style.display = "none";
    getElement("videos-list").style.display = "none";
    getElement("button-back").style.display = "none";
    getElement("songs").style.display = "block";
  } else if (getElement("video-container").style.display === "block") {
    getElement("video-container").innerHTML = "";
    getElement("video-container").style.display = "none";
    getElement("button-save").style.display = "none";
    getElement("button-add").style.display = "block";
    getElement("videos").style.display = "block";
    getElement("videos-list").style.display = "inline-table";
  }
}

function saveButtonClick() {
  var notes = getElement("notes-section").value;
  localStorage.setItem(videoId + "-notes", notes);
}

function closePopup() {
  getElement("popup-container").innerHTML = "";
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