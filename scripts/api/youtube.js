var ytApiKey = "AIzaSyCy5fZy7crC9BG0cQqLeLnbWnH4dxwVrQ0";

var playlistName;

function getVideo(url, div, type) {
  url = url.replace("http://").replace("https://");
      
  if (url.indexOf("?") >= 0) {
    if (url.indexOf("&list") >= 0) {
      url = url.substr(0, url.indexOf("&list"));
    }
    
    videoId = url.substr(url.indexOf("v=") + 2);
    createVideoElement(div + "-list", getVideoTitle(), type);
  } else if (url.indexOf("youtu.be") >= 0) {
    videoId = url.substr(url.indexOf("/") + 1);
    createVideoElement(div + "-list", getVideoTitle(), type);
  } else {
    alert("Invalid YouTube URL!");
    url = null;      
  }
}

function getVideoTitle() {
  var result = null;

  var apiUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&fields=items(id,snippet)&key=" + ytApiKey;

  $.ajax({
    url: apiUrl,
    type: "get",
    dataType: "json",
    async: false,
    success: function (data) {
      if (data.items[0].snippet != null) {
        result = (data.items[0].snippet.title);
      }
    }
  });

  return result;
}

function getPlaylist(playlistId) {
  var result = [];

  var playlist = "https://www.googleapis.com/youtube/v3/playlists?part=snippet%2Clocalizations&id=" + playlistId + "&fields=items(localizations%2Csnippet%2Flocalized%2Ftitle)&key=" + ytApiKey;
  
  $.ajax({
    url: playlist,
    type: "get",
    dataType: "json",
    async: false,
    success: function (data) {
      playlistName = data.items[0].snippet.localized.title.replace("Versions", "").trim();
    }
  });

  result = makePlaylistRequest(result, playlistId, "");

  return result;
}

function makePlaylistRequest(result, playlistId, token) {
  var url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${ytApiKey}&pageToken=${token}`;

  $.ajax({
    url: url,
    type: "get",
    dataType: "json",
    async: false,
    success: function (data) {
      for (var i in data.items) {
        result.push(data.items[i].snippet.resourceId.videoId);
      }

      if (typeof data.nextPageToken !== "undefined") {
        makePlaylistRequest(result, playlistId, data.nextPageToken);
      } else if (typeof data.nextPageToken === "undefined" && typeof data.prevPageToken !== "undefined") {
        makePlaylistRequest(result, playlistId, data.pageToken);
      } 
    }
  });

  return result;
}
