function addButtonDone() {
  getElement("loader").style.display = "block";

  setTimeout(function () {
    if (getElement("artists").style.display === "block") {
      var artistName = getElement("input-artist-name").value;
      addArtist(artistName);
    } else if (getElement("categories").style.display === "block") {
      var categoryName = getElement("input-category-name").value;
      addCategory(categoryName);
    } else if (getElement("videos-div").style.display === "block") {
      var url = getElement("input-yt-url").value;
      getVideo(url, "videos", "song");
    } else {
      var title = getElement("input-song-name").value;
      
      if (title.indexOf("youtu") <= 0) {
        addSong(title);
      } else {
        var playlistId;
        
        if (title.indexOf("?list=") >= 0) {
          playlistId = title.substr(title.indexOf("list=") + 5);
          var playlist = getPlaylist(playlistId);

          addSong(playlistName);

          for (var i in playlist) {
            videoId = playlist[i];
            createVideoElement("videos-list", "song");
          }
        } else if (title.indexOf("?v=") >= 0) {
          getVideo(title, "songs", "category");
        } else {
          alert("Invalid YouTube playlist URL!");
          playlistId = null;
        }
      }
    }

    closePopup();
    addEvents();
  }, 500);
}

function addArtist(name) {
  if (localStorage.getItem("artists") === null) {
    localStorage.setItem("artists", "");
  }

  var id = name.toLowerCase().replace(/\ /g, "-").replace("'", "");

  var tableItem = "<tr id='" + id + "' onclick='onArtistClick(\"" + id + "\");' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''>" + name + "</td></tr>";

  if (localStorage.getItem("artists").indexOf(id) < 0) {
    getElement("artists-list").innerHTML += tableItem;
    localStorage.setItem("artists", getElement("artists").innerHTML.trim());

    addEvent(getElement(id), "artists");
  } else {
    alert("An artist with that ID already exists");
  }
} 

function addCategory(name) {
  if (localStorage.getItem(artist + "-categories") === null) {
    localStorage.setItem(artist + "-categories", "");
  }

  var id = name.toLowerCase().replace(/\ /g, "-").replace("'", "");

  var tableItem = "<tr id='" + id + "' onclick='onCategoryClick(\"" + id + "\");' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''>" + name + "</td></tr>";

  if (localStorage.getItem("artists").indexOf(id) < 0) {
    getElement("categories-list").innerHTML += tableItem;
    localStorage.setItem(artist + "-categories", getElement("categories").innerHTML.trim());

    addEvent(getElement(id), artist + "-categories");
  } else {
    alert("A category with that ID already exists");
  }
} 

function addSong(title) {
  if (localStorage.getItem(artist + "-" + category) === null) {
    localStorage.setItem(artist + "-" + category, "");
  }

  var id = title.toLowerCase().replace(/\ /g, "-").replace("'", "");
  song = id;

  var tableItem = "<tr id='" + id + "' onclick='onSongClick(\"" + id + "\");' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''>" + title + "</td></tr>";

  if (localStorage.getItem(artist + "-" + category).indexOf(id) < 0) {
    getElement("songs-list").innerHTML += tableItem;
    localStorage.setItem(artist + "-" + category, getElement("songs-list").innerHTML.trim());

    addEvent(getElement(id), artist + "-" + category);
  } else {
    alert("A song with that ID already exists");
  }
} 

function createVideoElement(id, type) {
  if (type === "category") {
    storage = artist + "-" + category;
  } else if (type === "song") {
    storage = artist + "-" + song;
  }

  var videoTitle = getVideoTitle();

  if (videoTitle !== null) {
    var tableItem = "<tr id='" + videoId + "' onclick='onVideoClick(\"" + videoId + "\")' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''>" + videoTitle + "</td></tr>";
    getElement(id).innerHTML += tableItem;

    localStorage.setItem(storage, getElement(id).innerHTML.trim());

    addEvent(getElement(videoId), storage);
  }
}

function deleteTableItem() {  
  localStorage.setItem(storage, localStorage.getItem(storage).replace(tableItem.outerHTML, "").trim());
  getElement(tableItem.parentElement.parentElement.id).innerHTML = localStorage.getItem(storage);

  localStorage.removeItem(artist + "-" + tableItem.id);

  closePopup();
  addEvents();
}