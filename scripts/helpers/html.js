var popups = {
  "add-artist": createPath("add-artist"),
  "add-category": createPath("add-category"),
  "add-song": createPath("add-song"),
  "add-video": createPath("add-video"),
  "confirm-delete": createPath("confirm-delete"),
  "debug-menu": createPath("debug-menu")
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

function getElement(id) {
  return document.getElementById(id);
}

function toggleDark() {
  var darken = getElement("darken");

  if (darken.style.display === "block") {
    getElement("darken").style.display = "none";
    getElement("header").style.zIndex = 2;
  } else {
    getElement("header").style.zIndex = -1;  
    getElement("darken").style.display = "block";
  }
}

function onTableItemPress(element) {
  getElement(element).style.background = "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#09F), to(#06F));";
  console.log(getElement(element).style.background);
}

function onTableItemRelease(element) {
	getElement(element).style.background = "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#ccc), to(#999));";
  console.log(getElement(element).style.background);
}
