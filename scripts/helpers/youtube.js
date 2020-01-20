var ytApiKey = "AIzaSyCqBSwFmhWAS04CfvTuwWJPlf7Hquq8LFE";

var playlistName;

// https://www.youtube.com/watch?v=jmd9HLuErgI&list=PL-hve6gMGjsnAvWCPZdxoEaJfBJGzswJ2&index=25&t=0s

function getVideo(url, div, type) {
  url = url.replace("http://").replace("https://");
      
  if (url.indexOf("?") >= 0) {
    if (url.indexOf("&list") >= 0) {
      url = url.substr(0, url.indexOf("&list"));
    }
    
    videoId = url.substr(url.indexOf("v=") + 2);
    createVideoElement(div + "-list", type);
  } else if (url.indexOf("youtu.be") >= 0) {
    videoId = url.substr(url.indexOf("/") + 1);
    createVideoElement(div + "-list", type);
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
      result = (data.items[0].snippet.title);
    }
  });

  return result;
}

function getPlaylist(playlistId) {
  var result = [];

  var playlist = "https://www.googleapis.com/youtube/v3/playlists?part=snippet%2Clocalizations&id=" + playlistId + "&fields=items(localizations%2Csnippet%2Flocalized%2Ftitle)&key=" + ytApiKey;
  var token = (typeof token === "undefined") ? "" : `&pageToken=${token}`, url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${ytApiKey}${token}`;

  $.ajax({
    url: playlist,
    type: "get",
    dataType: "json",
    async: false,
    success: function (data) {
      playlistName = data.items[0].snippet.localized.title.replace("Versions", "").trim();
    }
  });

  $.ajax({
    url: url,
    type: "get",
    dataType: "json",
    async: false,
    success: function (data) {
      for (var i in data.items) {
        result[i] = data.items[i].snippet.resourceId.videoId;
      }
    }
  });

  return result;
}