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
  }, { passive: true });

  wrapper.addEventListener("touchmove", e => {
    const y = e.touches[0].pageY;

    if (document.scrollingElement.scrollTop === 0 && y > startY) { }
  }, { passive: true });

  if (localStorage.getItem("elton-songs") !== null) {
    getElement("all-songs").innerHTML += localStorage.getItem("elton-songs");
    addSongEvents();
  }
});

function onSongClick(name) {
  song = name;

  getElement("loader").style.display = "block";

  getElement("songs").style.display = "none";
  getElement("button-debug").style.display = "none";
  
  getElement("button-back").style.display = "block";
  getElement("button-add").style.display = "block";
  getElement("videos").style.display = "block";
  getElement("videos-list").style.display = "inline-table";
  
  if (localStorage.getItem("elton-" + name) === null) {
    setHTML("#videos-list", "");
    localStorage.setItem("elton-" + name, "");
  } else {
    setHTML("#videos-list", localStorage.getItem("elton-" + name));
  }

  hideLoader();
}

function onVideoClick(id) {
  videoId = id;

  getElement("loader").style.display = "block";

  getElement("button-add").style.display = "none";
  getElement("button-back").style.display = "block";
  getElement("button-save").style.display = "block";
  getElement("videos").style.display = "none";
  getElement("videos-list").style.display = "none";
  getElement("video-container").style.display = "block";

  if (localStorage.getItem(id + "-notes") === "null" || localStorage.getItem(id + "-notes") === null ) {
    localStorage.setItem(id + "-notes", "");
  }

  var notes = localStorage.getItem(id + "-notes"); 

  getElement("video-container").innerHTML = "<iframe width=\'390\' height=\'315\' src='https\:/\/www.youtube.com/embed/" + id + "/frameborder=\'0\' allow=\'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\' allowfullscreen></iframe><br /><br/><center><textarea id='notes-section' rows='10' cols='53'>" + notes + "</textarea>";

  addVideoEvents();

  hideLoader();
}

function addSongEvents() {
  var rows = getElement("all-songs").rows;

  for (var i = 0; i < rows.length; i++) {
    addEvent(rows[i], "elton-songs");
  }
}

function addVideoEvents() {
  var videos = getElement("videos-list").getElementsByTagName("tr");

  if (videos.length > 0) {
    for (var idx in videos) {
      var item = getElement(videos.item(idx).id);
      addEvent(item, "elton-" + song);
    }
  }
}

function addEvent(t, s) {
  storage = s;

  t.addEventListener("long-press", function (e) {
    tableItem = t;
    getElement("popup-container").innerHTML = getSnippet("confirm-delete");
  });
}