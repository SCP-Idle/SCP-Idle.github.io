$(document).ready(function() {
  // Initial Game Setup
  var data = newResource("data", 0, 1, 1, 0, 1, 0)
  var desc = newResource("desc", 0, 1, 1, 0, 1, 0, true, "data", 250)
  var contProc = newResource("contProc", 0, 1, 1, 0, 1, 0, true, "desc", 100)
  
    // Game Setup
  function resetGame() {
    data = 0;
    $("#data").text(data);
    dataIdle = 0;
    dataClick = 1;
    clickUpgrade1Cost = 10;
    $("#clickUpgrade1").text("Click Upgrade 1 (Cost: " + clickUpgrade1Cost + ")");
    idleUpgrade1Cost = 10;
    $("#idleUpgrade1").text("Idle Upgrade 1 (Cost: " + idleUpgrade1Cost + ")");
  }
  
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
  
  // Update Game
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
    
  // Function for Saving Data
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
  
  function deleteData() {
    localStorage.removeItem("SCPIdleData");
    alert("Save data deleted.");
    resetGame;
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
  
  $("#resetData").click(deleteData);

  function newResource(name, amount, baseClick, multiClick, baseIdle, multiIdle, multiBoth, hidden = false, hiddenResource = "data", hiddenAmount = 0) {
    return {
      // name: str, The resource's name
      name: name,
      // amount: int, The amount of the resource
      amount: amount,
      // baseClick: int, The base amount for manually harvesting
      baseClick: baseClick,
      // multiClick: int, The multiplier for manually harvesting
      multiClick: multiClick,
      // baseIdle: int, The base amount for idle harvesting
      baseIdle: baseIdle,
      // multiIdle: int, The multiplier for idle harvesting
      multiIdle: multiIdle,
      // multiBoth: int, A multiplier added to both the manual and idle multipliers
      multiBoth: multiBoth,
      // hidden: bool, optional, Whether the resource starts hidden
      hidden: hidden,
      // hiddenResource: str, optional, The resource used if it is hidden
      hiddenResource: hiddenResource,
      // hiddenAmount: int, optional, The amount of the resource to un-hide it
      hiddenAmount: hiddenAmount
    };
  }

    function newUpgrade(name, costResource, costAmount, purchased, effect, hidden = false, hiddenResource = "data", hiddenAmount = 0) {
      return {
        // name: str, The resource's name
        name: name,
        // costResource: str, The resource used to buy this upgrade
        costResource: costResource,
        // costAmount: int, The amount of the resourced use to buy this upgrade
        costAmount: costAmount,
        // purchased: bool, Whether the upgrade has been purchased
        purchased: purchased,
        // effect: function, What this upgrade does when purchased
        effect: effect,
        // hidden: bool, optional, Whether the upgrade starts hidden
        hidden: hidden,
        // hiddenResource: str, optional, The resource used if it is hidden
        hiddenResource: hiddenResource,
        // hiddenAmount: int, optional, The amount of the resource to un-hide it
        hiddenAmount: hiddenAmount
      };
});
