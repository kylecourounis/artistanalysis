


function addButtonDone() {
  if (getElement("videos").style.display === "block" && getElement("songs").style.display === "none") {
    var url = getElement("input-yt-url").value.replace("http://").replace("https://");
    
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
    addSong(getElement("input-song-name").value);
  }

  closePopup();
  addSongEvents();
}

function addSong(title) {
  if (localStorage.getItem("elton-songs") === null) {
    localStorage.setItem("elton-songs", "");
  }

  var id = title.toLowerCase().replace(/\ /g, "-").replace("'", "");

  var tableItem = "<tr id='" + id + "' onclick='onSongClick(\"" + id + "\");' data-long-press-delay='300'><td>" + title + "</td></tr>";

  if (localStorage.getItem("elton-songs").indexOf(id) < 0) {
    getElement("all-songs").innerHTML += tableItem;
    localStorage.setItem("elton-songs", getElement("all-songs").innerHTML);
    localStorage.setItem("elton-songs", localStorage.getItem("elton-songs").trim());

    addEvent(getElement(id), "elton-songs");
  } else {
    alert("A song with that ID already exists");
  }
} 

function createVideoElement() {
  var tableItem = "<tr id='" + videoId + "' onclick='onVideoClick(\"" + videoId + "\")' data-long-press-delay='300'><td>" + getVideoTitle() + "</td></tr>";

  getElement("videos").getElementsByTagName("table")[0].innerHTML += tableItem;
  localStorage.setItem("elton-" + song, getElement("videos").getElementsByTagName("table")[0].innerHTML);
  localStorage.setItem("elton-" + song, localStorage.getItem("elton-" + song).trim());

  addEvent(getElement(videoId), "elton-" + song);
}

function deleteTableItem() {
  localStorage.setItem(storage, localStorage.getItem(storage).replace("<tbody>" + tableItem.outerHTML + "</tbody>", ""));
  localStorage.setItem(storage, localStorage.getItem(storage).trim());
  
  if (storage === "elton-songs") {
    getElement("all-songs").innerHTML = localStorage.getItem(storage);
  } else {
    getElement(tableItem.parentElement.parentElement.id).innerHTML = localStorage.getItem(storage);
  }

  closePopup();
  addSongEvents();
}