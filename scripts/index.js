var song = "";
var videoId = "";

var tableItem;
var storage;

let startY = 0;
const wrapper = document.querySelector("#wrapper");

$(document).ready(function () {
  // testAddSongs();
  
  wrapper.addEventListener("touchstart", e => {
    startY = e.touches[0].pageY;
  }, {passive: true});

  wrapper.addEventListener("touchmove", e => {
    const y = e.touches[0].pageY;

    if (document.scrollingElement.scrollTop === 0 && y > startY) { }
  }, { passive: true });
  
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
    setHTML("#videos-list", "");
    localStorage.setItem("elton-" + name, "");
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
  var rows = document.getElementById("all-songs").rows;

  for (var i = 0; i < rows.length; i++) {
    addEvent(rows[i], "elton-songs");
  }
}

function addVideoEvents() {
  var videos = document.getElementById("videos-list").getElementsByTagName("tr");

  if (videos.length > 0) {
    for (var idx in videos) {
      var item = document.getElementById(videos.item(idx).id);
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

function addEvent(t, s) {
  tableItem = t;
  storage = s;

  t.addEventListener("long-press", function (e) {
    document.getElementById("popup-container").innerHTML = getSnippet("confirm-delete");
  });
}
