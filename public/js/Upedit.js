/*global $*/
$('.toolbar button').click(function(e)
{
  var command = this.attributes[0].value;
  if (command == 'h1' || command == 'h2' || command == 'h3' || command == 'h4' || command == 'h5' || command == 'p' || command == 'li')
    document.execCommand('formatBlock', false, command);
  else
    document.execCommand($(this).data('command'), false, null);
});

function upeditSave(id) {
  var xhttp = new XMLHttpRequest();
  var content = "id=" + id + "&html=" + encodeURIComponent(document.getElementById("editor").innerHTML);
  var success = "<div id=\"save-success\">Your file is saved !</div>"

  if (document.getElementById('save-success')) {
    document.getElementById('save-success').outerHTML = "";
  }
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("editor").outerHTML += success;
      }
  };
  xhttp.open("POST", "/Upedit?_method=POST", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(content);
}