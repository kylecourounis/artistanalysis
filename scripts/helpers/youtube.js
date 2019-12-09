var ytApiKey = "AIzaSyCqBSwFmhWAS04CfvTuwWJPlf7Hquq8LFE";

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