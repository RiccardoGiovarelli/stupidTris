import {myTris} from './myTris.js';
import {scoreManager} from './scoreManager.js';
import './../style/main.css';

$(document).ready(function() {

  //Add event listener
  document.getElementById("tris_grid").addEventListener("click", function(e) {
      nowWePlayTris.manageMove(e);
  });

  //Init objects play object
  var nowWePlayTris = Object.create(myTris);

  //Read current score ad set results
  var read_promise = new Promise(
      function(resolve, reject) {
          resolve(scoreManager.readScore());
      }
  );

  read_promise.then(
      function(response) {
          var current_round = 0;
          var player_score = 0;
          var ia_score = 0;
          for (var key in response) {
              if (response.hasOwnProperty(key)) {
                  current_round = response[key]['round'];
                  player_score = player_score + +response[key]['player'];
                  ia_score = ia_score + +response[key]['ia'];
                  $("#player_score_value").text(player_score);
                  $("#player_ia_value").text(ia_score);
                  $("#match_value").text(current_round);
                  if (current_round == 0) $("#reset_button").css("visibility", 'hidden');
              }
            }
      }
  );
});