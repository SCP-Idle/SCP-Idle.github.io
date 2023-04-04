$(document).ready(function(){

  updatePlayer();
  updateScore();
  updateBuildings();

});

const player = {
  name: "Testeroni",
  title: "MFT",
  class: "A",
  clearance: 5
};

const score = {
  data: 0
};

const dclass = {
  amount: 0,
  cost: 15
};

function updatePlayer() {
  $("#Name").html(player.name);
  $("#Title").html(player.title);
  $("#Class").html(player.class);
  $("#Clearance").html(player.clearance);
