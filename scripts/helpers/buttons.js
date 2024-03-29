var storedScrollX;
var storedScrollY;

function addButtonClick() {
  if (!isMobile()) {
    glowOnClick("button-add");
  }

  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";
    toggleDark();

    if (checkDisplay("block", "none", "none", "none", "none")) {
      getElement("popup-container").innerHTML = getSnippet("add-artist");
    } else if (checkDisplay("block", "block", "none", "none", "none")) {
      getElement("popup-container").innerHTML = getSnippet("add-category");
    } else if (checkDisplay("block", "block", "block", "block", "none")) {
      getElement("popup-container").innerHTML = getSnippet("add-video");
    } else if (checkDisplay("block", "block", "block", "none", "none")) {
      getElement("popup-container").innerHTML = getSnippet("add-song");
    }
  }, 400);
}

function backButtonClick() {
  if (!isMobile()) {
    glowOnClick("button-back");
  }

  if (checkDisplay("block", "block", "none", "none", "none")) {
    slide("artists", 1);

    getElement("categories").style.display = "none";
    slide("categories", 1);

    getElement("button-back").style.display = "none";
    
    getElement("button-debug").style.display = "block";

    getElement("header-txt").innerText = "Artists"; 

    window.scrollTo(storedScrollX, storedScrollY);

    storage = "artists";
  } else if (checkDisplay("block", "block", "block", "none", "none")) {
    slide("categories", 1);

    getElement("songs-div").style.display = "none";
    slide("songs-div", 1);

    getElement("videos-list").style.display = "none";
    getElement("button-save").style.display = "none";
    
    getElement("button-back").style.display = "block";
    getElement("button-add").style.display = "block";

    getElement("categories").style.display = "block";

    getElement("header-txt").innerText = getElement(artist).innerText.replace(">", "");

    window.scrollTo(storedScrollX, storedScrollY);

    storage = artist + "-categories";
  } else if (checkDisplay("block", "block", "block", "block", "none")) {
    slide("songs-div", 1);

    getElement("videos-div").style.display = "none";
    slide("videos-div", 1);

    getElement("videos-list").style.display = "none";
    getElement("videos-list").innerHTML = "";

    getElement("button-debug").style.display = "none";

    getElement("button-back").style.display = "block";
    getElement("songs-div").style.display = "block";
    getElement("songs-list").style.display = "inline-table";

    getElement("header-txt").innerText = getElement(category).innerText.replace(">", "");

    window.scrollTo(storedScrollX, storedScrollY);

    storage = artist + "-" + category;
  } else if (checkDisplay("block", "block", "block", "block", "block")) {
    slide("videos-div", 1);

    document.getElementsByTagName("body")[0].style.overflowY = "auto";
    
    getElement("video-container").innerHTML = "";
    getElement("video-container").style.display = "none";
    slide("video-container", 1);

    getElement("button-save").style.display = "none";

    getElement("button-add").style.display = "block";
    getElement("videos-div").style.display = "block";
    getElement("videos-list").style.display = "inline-table";

    getElement("header-txt").innerText = "Videos";
    
    window.scrollTo(storedScrollX, storedScrollY);

    storage = artist + "-" + song;
  }
}

function debugButtonClick() {
  if (!isMobile()) {
    glowOnClick("button-debug");
  }

  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";
    getElement("popup-container").innerHTML = getSnippet("debug-menu");
    toggleDark();
  }, 400);
}

function saveButtonClick() {
  if (!isMobile()) {
    glowOnClick("button-save");
  }

  getElement("loader").style.display = "block";

  setTimeout(function () {
    getElement("loader").style.display = "none";
    
    var notesStorage = localStorage.getItem("notes");

    if (notesStorage === null) {
      localStorage.setItem("notes", "{}");
    }

    var notes = getElement("notes-section").value;

    var json = JSON.parse(notesStorage);
    var jsonStr;

    if (json[videoId]) {
      json[videoId] = notes;
      jsonStr = JSON.stringify(json);
    } else if (notesStorage == "{}") {
      jsonStr = notesStorage.substring(0, notesStorage.length - 1) + ("\"" + videoId + "\":" + " \"" + notes + "\"") + "}";
    } else {
      jsonStr = notesStorage.substring(0, notesStorage.length - 1) + "," + ("\"" + videoId + "\":" + " \"" + notes + "\"") + "}";
    }
    
    localStorage.setItem("notes", jsonStr);
  }, 400);
}

function closePopup() {
  if (isMobile()) {
    clearPopup();
  } else {
    setTimeout(function () {
      clearPopup();
    }, 100);
  }
}

function clearPopup() {
  getElement("popup-container").innerHTML = "";
  getElement("loader").style.display = "none";
  toggleDark();
}

function tableItemClicked(element) {
  if (!isMobile()) {
    element.className = "touched";

    setTimeout(function () {
      element.className = "";
    }, 100);
  }
}

function lightupOnClick(id) {
  if (!isMobile()) {
    getElement(id).className = "popup-button-over";

    setTimeout(function () {
      getElement(id).className = "popup-button";
    }, 100);
  }
}

function glowOnClick(where) {
  glow(where);

  setTimeout(function () {
    noGlow();
  }, 100);
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

function checkDisplay(artistsDiv, categoriesDiv, songsDiv, videosDiv, vidContainerDiv) {
  return getElement("artists").style.display === artistsDiv && getElement("categories").style.display === categoriesDiv && getElement("songs-div").style.display === songsDiv && getElement("videos-div").style.display === videosDiv && getElement("video-container").style.display === vidContainerDiv;
}