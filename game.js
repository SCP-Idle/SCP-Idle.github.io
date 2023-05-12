$(document).ready(function() {
  var data = 0;
  var upgrade1Cost = 10;
  var upgrade1Value = 1;

  function update() {
    data += upgrade1Value;
    $("#data").text(data);

    if (data >= upgrade1Cost) {
      $("#upgrade1").prop("disabled", false);
    }
  }

  setInterval(update, 1000);

  $("#click").click(function() {
    data += 1;
    $("#data").text(data);
  });

  $("#upgrade1").click(function() {
    data -= upgrade1Cost;
    upgrade1Cost *= 2;
    upgrade1Value += 1;
    $("#data").text(data);
    $(this).text("Upgrade 1 (Cost: " + upgrade1Cost + ")");
  });
});
