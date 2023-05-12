$(document).ready(function() {
  // Define Game Data
  var data = 0;
  var dataIdle = 0;
  var dataClick = 1;
  var clickUpgrade1Cost = 10;
  var idleUpgrade1Cost = 10;
  
  // Load Saved Data
  var savedData = JSON.parse(localStorage.getItem("SCPIdleData"));
  if (savedData) {
    data = savedData.data;
    $("#data").text(data);
    dataIdle = savedData.dataIdle;
    dataClick = savedData.dataClick;
    clickUpgrade1Cost = savedData.clickUpgrade1Cost;
    $("#clickUpgrade1").text("Click Upgrade 1 (Cost: " + clickUpgrade1Cost + ")");
    idleUpgrade1Cost = savedData.idleUpgrade1Cost;
    $("#idleUpgrade1").text("Idle Upgrade 1 (Cost: " + idleUpgrade1Cost + ")");
  }

  function updateGame() {
    data += dataIdle;
    $("#data").text(data);

    if (data >= clickUpgrade1Cost) {
      $("#clickUpgrade1").prop("disabled", false);
    } else {
      $("#clickUpgrade1").prop("disabled", true);
    }
      
    if (data >= idleUpgrade1Cost) {
      $("#idleUpgrade1").prop("disabled", false);
    } else {
      $("#idleUpgrade1").prop("disabled", true);
    }
  }
    
  function saveData() {
    var saveData = {
      data: data,
      dataIdle: dataIdle,
      dataClick: dataClick,
      clickUpgrade1Cost: clickUpgrade1Cost,
      idleUpgrade1Cost: idleUpgrade1Cost
    };
    localStorage.setItem("SCPIdleData", JSON.stringify(saveData));
  }
  
  function deleteSaveData() {
    localStorage.removeItem("SCPIdleData");
    alert("Save data deleted.");
  }

  setInterval(updateGame, 1000);
  
  setInterval(saveData, 60000);

  $("#click").click(function() {
    data += dataClick;
    $("#data").text(data);
  });

  $("#clickUpgrade1").click(function() {
    if (data >= clickUpgrade1Cost) {
      data -= clickUpgrade1Cost;
      clickUpgrade1Cost *= 1.25;
      clickUpgrade1Cost = Math.round(clickUpgrade1Cost * 1.25)
      dataClick += 1;
      $("#data").text(data);
      $(this).text("Click Upgrade 1 (Cost: " + clickUpgrade1Cost + ")");
    }
  });
  
  $("#idleUpgrade1").click(function() {
    if (data >= idleUpgrade1Cost) {
      data -= idleUpgrade1Cost;
      idleUpgrade1Cost = Math.round(idleUpgrade1Cost * 1.5)
      dataIdle += 1;
      $("#data").text(data);
      $(this).text("Idle Upgrade 1 (Cost: " + idleUpgrade1Cost + ")");
    }
  });
  
  $("#saveData").click(saveData);
  
  $("#resetData").click(deleteSaveData);
});
