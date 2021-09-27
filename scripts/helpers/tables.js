function addButtonDone() {
  getElement("loader").style.display = "block";

  setTimeout(function () {
    if (checkDisplay("block", "none", "none", "none", "none")) {
      var artistName = getElement("input-artist-name").value;
      addArtist(artistName);
    } else if (checkDisplay("block", "block", "none", "none", "none")) {
      var categoryName = getElement("input-category-name").value;
      addCategory(categoryName);
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

          addSong(playlistName);

          for (var i in playlist) {
            videoId = playlist[i];
            createVideoElement("videos-list", "song");
          }

          getElement("videos-list").innerHTML = "";
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
    localStorage.setItem("artists", "");
  }

  var id = name.toLowerCase().replace(/\ /g, "-").replace("'", "");

  var tableItem = "<tr id='" + id + "' onclick='onArtistClick(\"" + id + "\");' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''><div id='text'>" + name + "</div><div class='pointer'>></div></td></tr>";

  if (localStorage.getItem("artists").indexOf(id) < 0) {
    getElement("artists-list").innerHTML += tableItem;
    localStorage.setItem("artists", getElement("artists").innerHTML.trim());

    addEvent(getElement(id), "artists");
  } else {
    alert("An artist with that ID already exists");
    return;
  }
} 

function addCategory(name) {
  if (name === "" || name === null) {
    alert("You did not enter a name for the new category!");
    return;
  }

  if (localStorage.getItem(artist + "-categories") === null) {
    localStorage.setItem(artist + "-categories", "");
  }

  var id = name.toLowerCase().replace(/\ /g, "-").replace("'", "");

  var tableItem = "<tr id='" + id + "' onclick='onCategoryClick(\"" + id + "\");' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''><div id='text'>" + name + "</div><div class='pointer'>></div></td></tr>";

  if (localStorage.getItem("artists").indexOf(id) < 0) {
    getElement("categories-list").innerHTML += tableItem;
    localStorage.setItem(artist + "-categories", getElement("categories").innerHTML.trim());

    addEvent(getElement(id), artist + "-categories");
  } else {
    alert("A category with that ID already exists");
    return;
  }
} 

function addSong(title) {
  if (title === "" || title === null) {
    alert("You did not enter a title or YouTube Playlist URL!");
    return;
  }

  if (localStorage.getItem(artist + "-" + category) === null) {
    localStorage.setItem(artist + "-" + category, "");
  }

  var id = title.toLowerCase().replace(/\ /g, "-").replace("'", "");
  song = id;

  var tableItem = "<tr id='" + id + "' onclick='onSongClick(\"" + id + "\");' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''><div id='text'>" + title + "</div><div class='pointer'>></div></td></tr>";

  if (localStorage.getItem(artist + "-" + category).indexOf(id) < 0) {
    getElement("songs-list").innerHTML += tableItem;
    localStorage.setItem(artist + "-" + category, getElement("songs-list").innerHTML.trim());

    addEvent(getElement(id), artist + "-" + category);
  } else {
    alert("A song with that ID already exists");
    return;
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
    var tableItem = "<tr id='" + videoId + "' onclick='onVideoClick(\"" + videoId + "\")' data-long-press-delay='600'><td ontouchstart=\"this.className='touched';\" ontouchend=\"this.className='';\" data-long-press-delay='600' class=''><div id='text'>" + videoTitle + "</div><div class='pointer'>></div></td></tr>";
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