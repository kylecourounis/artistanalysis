var popups = {
    "saturday-night": createPath("saturday-night"),
    "standing": createPath("standing"),
    "bennie": createPath("bennie"),
    "bitch": createPath("bitch"),
    "confirm-delete": createPath("confirm-delete"),
    "add-song": createPath("add-song"),
    "add-video": createPath("add-video"),
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

function hideLoader() {
  setTimeout(function () {
    getElement("loader").style.display = "none";
  }, 600);
}