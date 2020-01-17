var popups = {
    "saturday-night": createPath("saturday-night"),
    "standing": createPath("standing"),
    "bennie": createPath("bennie"),
    "bitch": createPath("bitch"),
    "confirm-delete": createPath("confirm-delete"),
    "add-song": createPath("add-song"),
    "add-video": createPath("add-video")    
};

function getSnippet(name) {
    var result = null;

    $.ajax({
        url: popups[name],
        type: 'get',
        dataType: 'html',
        async: false,
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

function addSong(id, title) {
  var tableItem = "<tr id='" + id + "' onclick='onSongClick(\"" + id + "\");' data-long-press-delay='300'><td>" + title + "</td></tr>";

  document.getElementById("all-songs").innerHTML += tableItem;
  localStorage.setItem("elton-songs", document.getElementById("all-songs").innerHTML);
  localStorage.setItem("elton-songs", localStorage.getItem("elton-songs").trim());
} 

function testAddSongs() {
  for (var i = 0; i < 15; i++) {
    addSong("test" + i, "Test" + i);
  }
}