var ytApiKey = "AIzaSyCqBSwFmhWAS04CfvTuwWJPlf7Hquq8LFE";

var playlistName;

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