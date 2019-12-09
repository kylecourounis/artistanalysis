var song = "";
var videoId = "";

$(document).ready(function () {
    document.getElementById("all-songs").innerHTML += localStorage.getItem("elton-songs");
});

function onSongClick(name) {
  song = name;

  document.getElementById("songs").style.display = "none";
  document.getElementById("videos").style.display = "block";
  document.getElementById("videos-list").style.display = "block";
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
}
