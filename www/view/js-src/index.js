import {myTris} from './myTris.js';
import {scoreManager} from './scoreManager.js';
import * as trisLib from './trisLib.js';
import './../style/main.css';

$(document).ready(function() {

    //Init objects play object
    var nowWePlayTris = Object.create(myTris);

    //Add click listener on table
    document.getElementById("tris_grid").addEventListener("click", function(e) {
        nowWePlayTris.manageMove(e);
    });

    //Check window resize
    $(window).resize(function(){
        trisLib.repaintTable();
    });

    //Read current score ad set results
    var current_situation = scoreManager.readScore()
    $("#player_score_value").text(current_situation['currentPlayerScore']);
    $("#player_ia_value").text(current_situation['currentAiScore']);
    $("#match_value").text(current_situation['currentRound']);
    if (current_situation['currentRound'] == 0) $("#reset_button").css("visibility", 'hidden');

    //Set table height
    trisLib.repaintTable();

});