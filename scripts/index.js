var artist;
var category;
var song;
var videoId;

var tableItem;

var storage = "artists";

let startY = 0;
const wrapper = document.querySelector("#wrapper");

$(document).ready(function () {
  // testAddSongs();

  getElement("artists").style.webkitTransform = "translate3d(0px, 0px, 0px)";

  wrapper.addEventListener("touchstart", e => {
    startY = e.touches[0].pageY;
  }, { passive: true });

  wrapper.addEventListener("touchmove", e => {
    const y = e.touches[0].pageY;

    if (document.scrollingElement.scrollTop === 0 && y > startY) { }
  }, { passive: true });

  if (localStorage.getItem("artists") !== null) {
    buildHTML("artists", JSON.parse(localStorage.getItem("artists")));
    addEvents();
  }
});

function isMobile() {
  return window.matchMedia("(pointer:coarse)").matches;
}

function onArtistClick(name) {
  artist = name;
  storage = name + "-categories";

  getElement("header-txt").innerText = getElement(name).innerText.replace(">", "");
  
  storedScrollX = window.scrollX;
  storedScrollY = window.scrollY;
  
  window.scrollTo(0, 0);

  getElement("loader").style.display = "block";

  slide("artists", 0);

  setTimeout(function () {
    getElement("loader").style.display = "none";

    // getElement("artists").style.display = "none";
    getElement("button-debug").style.display = "none";
    
    getElement("button-back").style.display = "block";
    getElement("button-add").style.display = "block";
    getElement("categories").style.display = "block";
    
    if (localStorage.getItem(artist + "-categories") === null) {
      setHTML("#categories-list", "");
    } else {
      buildHTML("categories", JSON.parse(localStorage.getItem(artist + "-categories")));
    }

    addEvents();
  }, 500);
}

function onCategoryClick(name) {
  category = name;
  storage = artist + "-" + category;

  getElement("header-txt").innerText = getElement(name).innerText.replace(">", "");

  storedScrollX = window.scrollX;
  storedScrollY = window.scrollY;
  
  window.scrollTo(0, 0);

  getElement("loader").style.display = "block";

  slide("categories", 0);

  setTimeout(function () {
    getElement("loader").style.display = "none";

    // getElement("categories").style.display = "none";
    getElement("songs-div").style.display = "block";
    
    getElement("button-back").style.display = "block";
    getElement("button-add").style.display = "block";
    
    if (localStorage.getItem(storage) === null) {
      setHTML("#songs-list", "");
    } else {
      buildHTML("songs", JSON.parse(localStorage.getItem(storage)));
    }

    addEvents();
  }, 500);  
}

function onSongClick(name) {
  song = name;
  storage = artist + "-" + name;

  getElement("header-txt").innerText = "Videos";

  storedScrollX = window.scrollX;
  storedScrollY = window.scrollY;

  window.scrollTo(0, 0);

  getElement("loader").style.display = "block";

  slide("songs-div", 0);
  
  setTimeout(function () {
    getElement("loader").style.display = "none";

    // getElement("songs-div").style.display = "none";
    
    getElement("button-back").style.display = "block";
    getElement("button-add").style.display = "block";
    getElement("videos-div").style.display = "block";
    getElement("videos-list").style.display = "inline-table";
    
    if (localStorage.getItem(storage) === null) {
      setHTML("#videos-list", '<table class="custom-tbl" id="videos-list" width="100%"></table>');
    } else {
      buildHTML("videos", JSON.parse(localStorage.getItem(storage)));
    }
    
    addEvents();
  }, 500);
}

function onVideoClick(id) {
  videoId = id;

  getElement("header-txt").innerText = "Video";

  storedScrollX = window.scrollX;
  storedScrollY = window.scrollY;

  window.scrollTo(0, 0);

  getElement("loader").style.display = "block";

  slide("videos-div", 0);

  setTimeout(function () {
    getElement("loader").style.display = "none";

    getElement("button-add").style.display = "none";
    getElement("button-back").style.display = "block";
    getElement("button-save").style.display = "block";

    // getElement("videos-div").innerHTML = '<table class="custom-tbl" id="videos-list" width="100%"></table>';
    
    getElement("video-container").style.display = "block";

    var notesStorage = localStorage.getItem("notes");

    if (notesStorage === null) {
      localStorage.setItem("notes", "{}");
    }

    var json = JSON.parse(notesStorage);

    var notes = (json[videoId]) ? json[videoId] : "";

    getElement("video-container").innerHTML = "<br/><br/></br><iframe width=\'100%\' height=\'315\' src='https\:/\/www.youtube.com/embed/" + id + "/frameborder=\'0\' allow=\'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\' allowfullscreen></iframe><br /><br/><center><textarea id='notes-section' rows='10' cols='53'>" + notes + "</textarea>";
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";

    addVideoEvents();
  }, 500);
}

function addEvents() {
  var rows = document.getElementById("artists-list").rows;
  for (var i = 0; i < rows.length; i++) {
    addEvent(rows[i], storage);
  }

  rows = document.getElementById("categories-list").rows;
  for (var i = 0; i < rows.length; i++) {
    addEvent(rows[i], storage);
  }

  rows = document.getElementById("songs-list").rows;
  for (var i = 0; i < rows.length; i++) {
    addEvent(rows[i], storage);
  }
}

function addVideoEvents() {
  var rows = getElement("videos-list").rows;
  for (var i = 0; i < rows.length; i++) {
    addEvent(rows[i], storage);
  }
}

function addEvent(t, s) {
  storage = s;

  t.addEventListener("long-press", function (e) {
    var isDark = toggleDark();

    // While this might seem redundant/useless, it actually does makes the app more consistent and stable. 
    if (!isDark) {
      getElement("header").style.zIndex = -1;  
      getElement("darken").style.display = "block";
    }

    tableItem = t;
    tableItem.children[0].className = "";

    getElement("popup-container").innerHTML = getSnippet("confirm-delete");
  });
}

function slide(element, direction) {
  if (direction == 1) {
    getElement(element).style.webkitTransform = "translate3d(0px, 0px, 0px)";
  } else {
    getElement(element).style.webkitTransform = "translate3d(-" + document.body.clientWidth + "px, 0px, 0px)";
  }
}