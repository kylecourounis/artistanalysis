function addButtonClick() {
  if (document.getElementById("songs").style.webkitTransform === "translate3d(-640px, 0px, 0px)") {
    document.getElementById("popup-container").innerHTML = getSnippet("add-video");
  } else {
    document.getElementById("popup-container").innerHTML = getSnippet("add-song");
  }
}

function addButtonDone() {
  if (document.getElementById("songs").style.webkitTransform === "translate3d(-640px, 0px, 0px)") {
    var url = document.getElementById("input-yt-url").value.replace("http://").replace("https://");
    
    if (url.indexOf("?") >= 0) {
      videoId = url.substr(url.indexOf("v=") + 2);
      createVideoElement();
    } else if (url.indexOf("youtu.be") >= 0) {
      videoId = url.substr(url.indexOf("/") + 1);
      createVideoElement();
    } else {
        alert("Invalid YouTube URL!");  
        url = null;      
    }
  } else {
    if (localStorage.getItem("elton-songs") === null) {
      localStorage.setItem("elton-songs", "");
    }
  
    var id = document.getElementById("input-song-id").value;
    var title = document.getElementById("input-song-name").value;

    if (localStorage.getItem("elton-songs").indexOf(id) < 0) {
      addSong(id, title);
    } else {
      alert("A song with that ID already exists");
    }
  }

  closePopup();
}

function createVideoElement() {
  var tableItem = "<tr id='" + videoId + "' onclick='onVideoClick(\"" + videoId + "\")' data-long-press-delay='500'><td>" + getVideoTitle() + "</td></tr>";

  document.getElementById("videos").getElementsByTagName("table")[0].innerHTML += tableItem;
  localStorage.setItem("elton-" + song, document.getElementById("videos").getElementsByTagName("table")[0].innerHTML);
  localStorage.setItem("elton-" + song, localStorage.getItem("elton-" + song).trim());

  addEvent(document.getElementById(videoId), "elton-" + song);
}

function backButtonClick() {
  if (document.getElementById("songs").style.display === "none") {
    document.getElementById("videos-list").style.display = "none";
    document.getElementById("button-back").style.display = "none";
    // slide("songs", "videos", "r");
    sliding("songs", "l");
  } else if (document.getElementById("video-container").style.display === "block") {
    document.getElementById("video-container").innerHTML = "";
    document.getElementById("video-container").style.display = "none";
    document.getElementById("button-save").style.display = "none";
    document.getElementById("button-add").style.display = "block";
    document.getElementById("videos").style.display = "block";
    // document.getElementById("videos-list").style.display = "inline-table";
  }
}

function saveButtonClick() {
  var notes = document.getElementById("notes-section").value;
  localStorage.setItem(videoId + "-notes", notes);
}

function deleteTableItem() {
  localStorage.setItem(storage, localStorage.getItem(storage).replace("<tbody>" + tableItem.outerHTML + "</tbody>", ""));
  localStorage.setItem(storage, localStorage.getItem(storage).trim());
  
  if (storage === "elton-songs") {
    document.getElementById("all-songs").innerHTML = localStorage.getItem(storage);
  } else {
    document.getElementById(tableItem.parentElement.parentElement.id).innerHTML = localStorage.getItem(storage);
  }

  closePopup();
  addSongEvents();
}

function closePopup() {
  document.getElementById("popup-container").innerHTML = "";
}

function glow(where) {
	var offset = $("#" + where + "").offset();
	var width = $("#" + where + "").width();
  document.getElementById("glow").style.left = offset.left - ((80-width) / 2) + 'px';
  
	var height = $("#" + where + "").height();
	document.getElementById("glow").style.top = offset.top - ((80-height) / 2) + 'px';
	document.getElementById("glow").style.display = "block";
}

function noGlow() {
	document.getElementById("glow").style.display = "none";
}