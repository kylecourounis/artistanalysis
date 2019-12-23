function addButtonClick() {
  if (document.getElementById("videos-list").style.display === "block" && document.getElementById("songs").style.display === "none") {
      var url = prompt("Enter a YouTube URL:");
      
      if (url.indexOf("?") >= 0) {
          videoId = url.substr(url.indexOf("v=") + 2);
          
          var tableItem = "<tr id='" + videoId + "' onclick='onVideoClick(\"" + videoId + "\")' data-long-press-delay='500'><td>" + getVideoTitle() + "</td></tr>";

          document.getElementById("videos").getElementsByTagName("table")[0].innerHTML += tableItem;
          localStorage.setItem("elton-" + song, document.getElementById("videos").getElementsByTagName("table")[0].innerHTML);

          addEvent(document.getElementById(videoId), "elton-" + song);
      } else {
          alert("Invalid YouTube URL!");  
          url = null;      
      }
  } else {
      var title = prompt("Enter a song title:");
      var id = prompt("Enter a song id:");

      var tableItem = "<tr id='" + id + "' onclick='onSongClick(\"" + id + "\");' data-long-press-delay='1000'><td>" + title + "</td></tr>";

      document.getElementById("all-songs").innerHTML += tableItem;
      localStorage.setItem("elton-songs", document.getElementById("all-songs").innerHTML);

      addEvent(document.getElementById(id), "elton-songs");
  }
}

function backButtonClick() {
  if (document.getElementById("videos").style.display === "block") {
    var videos = document.getElementById("videos-list").getElementsByTagName("tr");

    if (videos.length > 0) {
      for (var idx in videos) {
        var item = document.getElementById(videos.item(idx).id);
        item.removeEventListener("long-press");
      }
    }

    document.getElementById("videos").style.display = "none";
    document.getElementById("videos-list").style.display = "none";
    document.getElementById("button-back").style.display = "none";
    document.getElementById("songs").style.display = "block";
    // document.getElementById("button-add").style.display = "none";
  } else if (document.getElementById("video-container").style.display === "block") {
      document.getElementById("video-container").style.display = "none";
      document.getElementById("button-save").style.display = "none";
      document.getElementById("button-add").style.display = "block";
      document.getElementById("videos").style.display = "block";
      document.getElementById("videos-list").style.display = "block";
  }    
}

function saveButtonClick() {
  var notes = document.getElementById("notes-section").value;
  localStorage.setItem(videoId + "-notes", notes);
}

function getConfirmation(text) {
  return confirm("Are you sure you want to delete " + text + "?");
}