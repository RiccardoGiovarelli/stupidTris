import {myTris} from './myTris.js';
import {scoreManager} from './scoreManager.js';
import './../style/main.css';

$(document).ready(function() {

    //Init objects play object
    var nowWePlayTris = Object.create(myTris);

    //Add event listener
    document.getElementById("tris_grid").addEventListener("click", function(e) {
        nowWePlayTris.manageMove(e);
    });

    //Read current score ad set results
    var current_situation = scoreManager.readScore()
    $("#player_score_value").text(current_situation['currentPlayerScore']);
    $("#player_ia_value").text(current_situation['currentAiScore']);
    $("#match_value").text(current_situation['currentRound']);
    if (current_situation['currentRound'] == 0) $("#reset_button").css("visibility", 'hidden');

});