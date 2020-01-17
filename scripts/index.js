var song = "";
var videoId = "";

var moveItBy;

var tableItem;
var storage;

let startY = 0;
const wrapper = document.querySelector("#wrapper");

$(document).ready(function () {
  testAddSongs();

  wrapper.addEventListener("touchstart", e => {
    startY = e.touches[0].pageY;
  }, { passive: true });

  wrapper.addEventListener("touchmove", e => {
    const y = e.touches[0].pageY;

    if (document.scrollingElement.scrollTop === 0 && y > startY) { }
  }, { passive: true });

  if (localStorage.getItem("elton-songs") !== null) {
    document.getElementById("all-songs").innerHTML += localStorage.getItem("elton-songs");
    addSongEvents();
  }

  // slide("songs", "videos");
  sliding("songs", "r");
});

function onSongClick(name) {
  song = name;

  // slide("videos", "songs");
  sliding("videos", "l");

  // document.getElementById("videos-list").style.display = "inline-table";
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

  // slide("video-container", "videos");
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
/* function removeVideoEvents() {
  var videos = document.getElementById("videos-list").getElementsByTagName("tr");
  
  if (videos.length > 0) {
    for (var idx in videos) {
      var item = document.getElementById(videos.item(idx).id);
      
      if (item !== null) {
        item.removeEventListener("long-press", null);
      }
    }
  }
} */

function addEvent(t, s) {
  storage = s;
  
  $("#" + t.id).on("long-press", function (e) {
    tableItem = t;
    
    // document.getElementById("popup-container").display = "contents";
    document.getElementById("popup-container").innerHTML = getSnippet("confirm-delete");
  });
}

function sliding(id, direction) {
	if (direction === 'l') { moveItBy = moveItBy - 640; } else {
		moveItBy = moveItBy+640;
		if (document.getElementById('wrapper').style.webkitTransform=='translate3d(-640px, 0px, 0px)') { setTimeout(function(){document.getElementById(id).innerHTML=""},405); }
	}
	document.getElementById('wrapper').style.webkitTransform='translate3d(' + moveItBy + 'px,0px,0px)';
}
/* 
function slide(id, toHide, val) {
  if (val === "r") {
    console.log("right");

    document.getElementById(toHide).style.webkitTransform = "translate3d(640px, 0px, 0px)";
    document.getElementById(id).style.webkitTransform = "translate3d(0px, 0px, 0px)";
  } else if (val === "l" || document.getElementById(id).style.webkitTransform === "translate3d(-640px, 0px, 0px)") {
    console.log("left");

    document.getElementById(toHide).style.webkitTransform = "translate3d(-640px, 0px, 0px)";
    document.getElementById(id).style.webkitTransform = "translate3d(0px, 0px, 0px)";
  } else {
    console.log("right");

    document.getElementById(toHide).style.webkitTransform = "translate3d(640px, 0px, 0px)";
    document.getElementById(id).style.webkitTransform = "translate3d(0px, 0px, 0px)";
  }
    
  setTimeout(function () {
    document.getElementById(toHide).style.display = "none";
    document.getElementById(id).style.display = "block";
  }, 200);
} */

//https://www.youtube.com/watch?v=s8yJ539jUEA