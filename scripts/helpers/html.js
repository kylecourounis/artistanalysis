var popups = {
    "saturday-night": createPath("saturday-night"),
    "standing": createPath("standing"),
    "bennie": createPath("bennie"),
    "bitch": createPath("bitch")
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