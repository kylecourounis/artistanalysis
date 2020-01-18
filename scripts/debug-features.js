function testAddSongs() {
  for (var i = 0; i < 15; i++) {
    addSong("Test" + i);
  }
}

function clearData() {
  localStorage.clear();
  getElement("all-songs").innerHTML = localStorage.getItem("elton-songs");
}