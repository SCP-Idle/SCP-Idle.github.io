$(document).ready(function() {
  var data = 0;
  var upgrade1Cost = 10;

  function update() {
    data += 1;
    $("#data").text(data);

    if (data >= upgrade1Cost) {
      $("#upgrade1").prop("disabled", false);
    }
  }

  setInterval(update, 1000);

  $("#upgrade1").click(function() {
    data -= upgrade1Cost;
    upgrade1Cost *= 2;
    $("#data").text(data);
    $(this).text("Upgrade 1 (Cost: " + upgrade1Cost + ")");
  });
});
