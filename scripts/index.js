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

  wrapper.addEventListener("touchstart", e => {
    startY = e.touches[0].pageY;
  }, { passive: true });

  wrapper.addEventListener("touchmove", e => {
    const y = e.touches[0].pageY;

    if (document.scrollingElement.scrollTop === 0 && y > startY) { }
  }, { passive: true });

  if (localStorage.getItem("artists") !== null) {
    getElement("artists-list").innerHTML += localStorage.getItem("artists");
    addEvents();
  }
});

function onArtistClick(name) {
  artist = name;
  storage = name + "-categories";

  getElement("header-txt").innerText = getElement(name).innerText.replace(">", "");
  
  window.scrollTo(0, 0);

  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";

    getElement("artists").style.display = "none";
    getElement("button-debug").style.display = "none";
    
    getElement("button-back").style.display = "block";
    getElement("button-add").style.display = "block";
    getElement("categories").style.display = "block";
    
    if (localStorage.getItem(artist + "-categories") === null) {
      setHTML("#categories-list", "");
      localStorage.setItem(artist + "-categories", "");
    } else {
      setHTML("#categories-list", localStorage.getItem(artist + "-categories"));
    }

    addEvents();
  }, 500);
}

function onCategoryClick(name) {
  category = name;
  storage = artist + "-" + category;

  getElement("header-txt").innerText = getElement(name).innerText.replace(">", "");

  window.scrollTo(0, 0);

  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";

    getElement("categories").style.display = "none";
    getElement("songs-div").style.display = "block";
    
    getElement("button-back").style.display = "block";
    getElement("button-add").style.display = "block";
    
    if (localStorage.getItem(storage) === null) {
      setHTML("#songs-list", "");
      localStorage.setItem(storage, "");
    } else {
      setHTML("#songs-list", localStorage.getItem(storage));
    }

    addEvents();
  }, 500);  
}

function onSongClick(name) {
  song = name;
  storage = artist + "-" + name;

  getElement("header-txt").innerText = "Videos";

  window.scrollTo(0, 0);

  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";

    getElement("songs-div").style.display = "none";
    
    getElement("button-back").style.display = "block";
    getElement("button-add").style.display = "block";
    getElement("videos-div").style.display = "block";
    getElement("videos-list").style.display = "inline-table";
    
    if (localStorage.getItem(storage) === null) {
      setHTML("#videos-list", '<table class="custom-tbl" id="videos-list" width="100%"></table>');
      localStorage.setItem(storage, "");
    } else {
      setHTML("#videos-list", localStorage.getItem(storage));
    }
    
    addEvents();
  }, 500);
}

function onVideoClick(id) {
  videoId = id;
  
  window.scrollTo(0, 0);

  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";

    getElement("button-add").style.display = "none";
    getElement("button-back").style.display = "block";
    getElement("button-save").style.display = "block";
    
    if (getElement("videos-div").style.display === "none") {
      getElement("songs-div").style.display = "none";
      getElement("videos-div").innerHTML = '<table class="custom-tbl" id="videos-list" width="100%"></table>';
    } else {
      getElement("videos-div").style.display = "none";
      getElement("videos-list").style.display = "none";
    }

    getElement("video-container").style.display = "block";

    if (localStorage.getItem(id + "-notes") === "null" || localStorage.getItem(id + "-notes") === null ) {
      localStorage.setItem(id + "-notes", "");
    }

    var notes = localStorage.getItem(id + "-notes");

    getElement("video-container").innerHTML = "<br/><br/></br><iframe width=\'100%\' height=\'315\' src='https\:/\/www.youtube.com/embed/" + id + "/frameborder=\'0\' allow=\'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\' allowfullscreen></iframe><br /><br/><center><textarea id='notes-section' rows='10' cols='53'>" + notes + "</textarea>";

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