var song = "";
var videoId = "";

$(document).ready(function () {
  if (localStorage.getItem("elton-songs") !== null) {
    document.getElementById("all-songs").innerHTML += localStorage.getItem("elton-songs");
    addSongEvents();
  }
});

function onSongClick(name) {
  song = name;

  document.getElementById("songs").style.display = "none";
  document.getElementById("videos").style.display = "block";
  document.getElementById("videos-list").style.display = "inline-table";
  document.getElementById("button-back").style.display = "block";
  document.getElementById("button-add").style.display = "block";

  if (localStorage.getItem("elton-" + name) === null) {
    setHTML("#videos-list", getSnippet(name));
  } else {
    setHTML("#videos-list", localStorage.getItem("elton-" + name));
  }
}

function onVideoClick(id) {
  videoId = id;

  document.getElementById("videos").style.display = "none";
  document.getElementById("videos-list").style.display = "none";
  document.getElementById("button-add").style.display = "none";
  document.getElementById("video-container").style.display = "block";
  document.getElementById("button-back").style.display = "block";
  document.getElementById("button-save").style.display = "block";

  if (localStorage.getItem(id + "-notes") === "null" || localStorage.getItem(id + "-notes") === null ) {
    localStorage.setItem(id + "-notes", "");
  }

  var notes = localStorage.getItem(id + "-notes"); 

  document.getElementById("video-container").innerHTML = "<iframe width=\'390\' height=\'315\' src='https\:/\/www.youtube.com/embed/" + id + "/frameborder=\'0\' allow=\'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\' allowfullscreen></iframe><br /><br/><br /><center><textarea id='notes-section' rows='10' cols='53'>" + notes + "</textarea>";

  addVideoEvents();
}

function addSongEvents() {
  var songs = document.getElementById("all-songs").getElementsByTagName("tr");

  if (songs.length > 0) {
    for (var idx in songs) {
        var item = document.getElementById(songs.item(idx).id);
        addEvent(item, "elton-songs");
    }
  }
}

function addVideoEvents() {
  var videos = document.getElementById("videos-list").getElementsByTagName("tr");

  if (videos.length > 0) {
    for (var idx in videos) {
      var item = document.getElementById(videos.item(idx).id);
      console.log(item);
      addEvent(item, "elton-" + song);
    }
  }
}

function removeVideoEvents() {
  var videos = document.getElementById("videos-list").getElementsByTagName("tr");
  
  if (videos.length > 0) {
    for (var idx in videos) {
      var item = document.getElementById(videos.item(idx).id);
      if (item !== null) {
        item.removeEventListener("long-press", null);
      }
    }
  }
}

function addEvent(tableItem, storage) {
  tableItem.addEventListener("long-press", function (e) {
    if (getConfirmation(tableItem.innerText)) {
      var stored = localStorage.getItem(storage);
      stored = stored.replace("<tbody>" + tableItem.outerHTML + "</tbody>", "");
      localStorage.setItem(storage, stored);
      window.location = "index.html";
    }
  });
}