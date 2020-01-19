function testAddSongs() {
  for (var i = 0; i < 15; i++) {
    addSong("Test" + i);
  }
}

function clearData() {
  localStorage.clear();

  getElement("artists-list").innerHTML = localStorage.getItem("artists");
  getElement("categories-list").innerHTML = localStorage.getItem("categories");
  getElement("songs-list").innerHTML = localStorage.getItem("elton");
}