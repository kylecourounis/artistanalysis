var popups = {
  "add-artist": createPath("add-artist"),
  "add-category": createPath("add-category"),
  "add-song": createPath("add-song"),
  "add-video": createPath("add-video"),
  "confirm-delete": createPath("confirm-delete"),
  "debug-menu": createPath("debug-menu")
};

function getSnippet(name) {
  var result = null;

  $.ajax({
      url: popups[name],
      type: 'get',
      dataType: 'html',
      async: false,
      cache: false,
      success: function (data) {
        result = data;
      }
  });

  return result;
}

function setHTML(id, data) {
  $(id).html(data);
}

function createPath(file) {
  return "snippets/" + file + ".html";
}

function getElement(id) {
  return document.getElementById(id);
}

function toggleDark() {
  var darken = getElement("darken");

  if (darken.style.display === "block") {
    getElement("darken").style.display = "none";
    getElement("header").style.zIndex = 2;
    document.getElementsByTagName("body")[0].style.overflow = "";
  } else {
    getElement("header").style.zIndex = -1;  
    getElement("darken").style.display = "block";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  }

  return darken.style.display === "block";
}

function buildHTML(type, json) {
  getElement(type + "-list").innerHTML = "";

  if (type === "artists") {
    for (var element in json) {
      addArtist(json[element]);
    }
  }
  if (type === "categories") {
    for (var element in json) {
      addCategory(json[element]);
    }
  }
  if (type === "songs") {
    for (var element in json) {
      addSong(json[element]);
    }
  }
  if (type === "videos") {
    for (var element in json) {
      videoId = element;
      createVideoElement("videos-list", json[element], "song");
    }
  }
}