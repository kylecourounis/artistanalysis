function addButtonDone() {
  getElement("loader").style.display = "block";

  setTimeout(function () {
    if (checkDisplay("block", "none", "none", "none", "none")) {
      var artistName = getElement("input-artist-name").value;

      if (JSON.stringify(localStorage.getItem("artists")).indexOf(artistName) >= 0) {
        alert("An artist with that ID already exists");
      } else {
        addArtist(artistName);
      }
    } else if (checkDisplay("block", "block", "none", "none", "none")) {
      var categoryName = getElement("input-category-name").value;

      if (JSON.stringify(localStorage.getItem(artist + "-categories")).indexOf(categoryName) >= 0) {
        alert("A category with that ID already exists");
      } else {
        addCategory(categoryName);
      }
    } else if (checkDisplay("block", "block", "block", "block", "none")) {
      var url = getElement("input-yt-url").value;
      getVideo(url, "videos", "song");
    } else if (checkDisplay("block", "block", "block", "none", "none")) {
      var title = getElement("input-song-name").value;
      
      if (title.indexOf("youtu") <= 0) {
        addSong(title);
      } else {
        var playlistId;
        
        if (title.indexOf("?list=") >= 0) {
          playlistId = title.substr(title.indexOf("list=") + 5);
          var playlist = getPlaylist(playlistId);

          if (JSON.stringify(localStorage.getItem(artist + "-" + category)).indexOf(playlistName) >= 0) {
            alert("A song with that ID already exists");
          } else {
            addSong(playlistName);

            for (var i in playlist) {
              videoId = playlist[i];
              createVideoElement("videos-list", getVideoTitle(), "song");
            }
  
            getElement("videos-list").innerHTML = "";
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
  if (name === "" || name === null) {
    alert("You did not enter a name for the new artist!");
    return;
  }

  if (localStorage.getItem("artists") === null) {
    localStorage.setItem("artists", "{}");
  }

  var id = name.toLowerCase().replace(/\ /g, "-").replace("'", "");

  var tableItem = "<tr id='" + id + "' onclick='onArtistClick(\"" + id + "\");' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''><div id='text'>" + name + "</div><div class='pointer'>></div></td></tr>";

  if (document.getElementById(id) === null) {
    getElement("artists-list").innerHTML += tableItem;
    
    saveArtist(name);

    addEvent(getElement(id), "artists");
  }
}

function saveArtist(name) {
  var artistsStorage = localStorage.getItem("artists");
  
  var id = name.toLowerCase().replace(/\ /g, "-").replace("'", "");

  if (artistsStorage.indexOf(id) < 0) {
    var json;

    if (artistsStorage !== "{}") {
      json = artistsStorage.substring(0, artistsStorage.length - 1) + "," + ("\"" + id + "\":" + " \"" + name + "\"") + "}";
    } else {
      json = artistsStorage.substring(0, artistsStorage.length - 1) + ("\"" + id + "\":" + " \"" + name + "\"") + "}";
    }
  
    localStorage.setItem("artists", json);
  }
}

function addCategory(name) {
  if (name === "" || name === null) {
    alert("You did not enter a name for the new category!");
    return;
  }

  if (localStorage.getItem(artist + "-categories") === null) {
    localStorage.setItem(artist + "-categories", "{}");
  }

  var id = name.toLowerCase().replace(/\ /g, "-").replace("'", "");

  var tableItem = "<tr id='" + id + "' onclick='onCategoryClick(\"" + id + "\");' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''><div id='text'>" + name + "</div><div class='pointer'>></div></td></tr>";
  
  if (document.getElementById(id) === null) {
    getElement("categories-list").innerHTML += tableItem;

    saveCategory(name);

    addEvent(getElement(id), artist + "-categories");
  }
} 

function saveCategory(name) {
  var categoryStorage = localStorage.getItem(artist + "-categories");
  
  var id = name.toLowerCase().replace(/\ /g, "-").replace("'", "");

  if (categoryStorage.indexOf(id) < 0) {
    var json;
    
    if (categoryStorage !== "{}") {
      json = categoryStorage.substring(0, categoryStorage.length - 1) + "," + ("\"" + id + "\":" + " \"" + name + "\"") + "}";
    } else {
      json = categoryStorage.substring(0, categoryStorage.length - 1) + ("\"" + id + "\":" + " \"" + name + "\"") + "}";
    }
  
    localStorage.setItem(artist + "-categories", json);
  }
}

function addSong(title) {
  if (title === "" || title === null) {
    alert("You did not enter a title or YouTube Playlist URL!");
    return;
  }

  if (localStorage.getItem(artist + "-" + category) === null) {
    localStorage.setItem(artist + "-" + category, "{}");
  }

  var id = title.toLowerCase().replace(/\ /g, "-").replace("'", "");
  song = id;

  var tableItem = "<tr id='" + id + "' onclick='onSongClick(\"" + id + "\");' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''><div id='text'>" + title + "</div><div class='pointer'>></div></td></tr>";
  
  if (document.getElementById(id) === null) {
    getElement("songs-list").innerHTML += tableItem;

    saveSong(title);

    addEvent(getElement(id), artist + "-" + category);
  }
} 

function saveSong(title) {
  var songStorage = localStorage.getItem(artist + "-" + category);
  
  var id = title.toLowerCase().replace(/\ /g, "-").replace("'", "");

  if (songStorage.indexOf(videoId) < 0) {
    var json;

    if (songStorage !== "{}") {
      json = songStorage.substring(0, songStorage.length - 1) + "," + ("\"" + id + "\":" + " \"" + title + "\"") + "}";
    } else {
      json = songStorage.substring(0, songStorage.length - 1) + ("\"" + id + "\":" + " \"" + title + "\"") + "}";
    }
  
    localStorage.setItem(artist + "-" + category, json);
  }
}

function createVideoElement(id, videoTitle, type) {
  if (type === "category") {
    storage = artist + "-" + category;
  } else if (type === "song") {
    storage = artist + "-" + song;
  }

  if (localStorage.getItem(storage) === null) {
    localStorage.setItem(storage, "{}");
  }

  if (document.getElementById(videoId) === null) {
    saveVideo(videoTitle, storage);
    
    var tableItem = "<tr id='" + videoId + "' onclick='onVideoClick(\"" + videoId + "\")' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''><div id='text'>" + videoTitle + "</div><div class='pointer'>></div></td></tr>";
    getElement(id).innerHTML += tableItem;

    addEvent(getElement(videoId), storage);
  }
}

function saveVideo(title) {
  var videosStorage = localStorage.getItem(storage);
  
  if (videosStorage.indexOf(videoId) < 0) {
    var json;
    
    title = title.replace(/"/g, "\\\"");

    if (videosStorage !== "{}") {
      json = videosStorage.substring(0, videosStorage.length - 1) + "," + ("\"" + videoId + "\":" + " \"" + title + "\"") + "}";
    } else {
      json = videosStorage.substring(0, videosStorage.length - 1) + ("\"" + videoId + "\":" + " \"" + title + "\"") + "}";
    }

    localStorage.setItem(storage, json);
  } else {
    title = JSON.parse(videosStorage)[videoId];
  }
}

function deleteTableItem() {
  var type;

  if (storage === "artists") {
    type = "artists";
    localStorage.removeItem(artist + "-categories");
  } else if (storage === artist + "-categories") {
    type = "categories";
    localStorage.removeItem(artist + "-" + tableItem.id);
  } else if (storage.endsWith("-songs")) {
    type = "songs";
    localStorage.removeItem(artist + "-" + tableItem.id);
  } else if (storage.endsWith(song)) {
    type = "videos";

    var notes = JSON.parse(localStorage.getItem("notes"));
    delete notes[tableItem.id];
  }

  var json = JSON.parse(localStorage.getItem(storage));
  delete json[tableItem.id];

  localStorage.setItem(storage, JSON.stringify(json));
  
  buildHTML(type, JSON.parse(localStorage.getItem(storage)));

  closePopup();
  addEvents();
}
