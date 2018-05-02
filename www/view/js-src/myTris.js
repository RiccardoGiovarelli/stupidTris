import {scoreManager} from './scoreManager.js';

export var myTris = {

    //////////////	
    //Properties//
    //////////////
    stateOfScoreTable: [],
    stateOfMatch: 1,
    faX: 'fas fa-times',
    fa0: 'far fa-circle',
    field: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],


    ///////////
    //Methods//
    ///////////

    //Manage the current move
    manageMove: function(e) {

        if (myTris.stateOfMatch == 0) return;

        //Get clicked square id
        var matched = e.target.id.match(/td-(\d)-(\d)/);
        if (matched == null) return;

        //Make current move for player
        myTris.makeMove(matched[1], matched[2], 'player');

        //Check if match ended
        var current_result = myTris.checkCurrentState(myTris.field);
        if (current_result !== 6) {
            myTris.manageResults(current_result);
            return;
        }

        var response_promise = new Promise(

            function(resolve, reject) {

                var nextMove = '';

                //New Ajax
                var xhttp = new XMLHttpRequest();

                //State management
                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState === 4 && xhttp.status === 200) {
                        resolve(JSON.parse(xhttp.responseText));
                    }
                };

                //Ajax call
                xhttp.open("POST", "../controller/tris_controller.php", true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send("request=nextMoveRequest" + "&currentGrid=" + myTris.field);
            }
        );

        response_promise.then(

            function(response) {

                myTris.makeMove(response[0], response[1], 'ia');

                //Check if match ended
                if ((current_result = myTris.checkCurrentState(myTris.field)) !== 6) {
                    myTris.manageResults(current_result);
                    return;
                }
            }
        );
    },


    //Manage buttons click
    manageFooter: function(e) {
        switch (e.target.id) {
            case 'restart_button':
                myTris.restartMatch();
                break;
            case 'reset_button':
                myTris.resetAI();
                break;
        }
    },


    //Make move (graphic)
    makeMove: function(x, y, who) {
        switch (who) {
            case 'player':
                $("#" + x + "-" + y).append( "<i class='" + myTris.faX + "'></i>" );
                myTris.field[x - 1][y - 1] = 1;
                return true;
                break;
            case 'ia':
                $("#" + (+x + 1) + "-" + (+y + 1)).append( "<i class='" + myTris.fa0 + "'></i>" );
                myTris.field[x][y] = 2;
                return true;
                break;
        }
    },


    //Manage final results
    manageResults: function(state) {

        switch (state) {
            case 3:
                myTris.stateOfMatch = 0;
                $("#msg_box").text("Even!");
                break;
            case 4:
                scoreManager.saveScore('player');
                myTris.stateOfMatch = 0;
                $("#msg_box").text("You won!");
                break;
            case 5:
                scoreManager.saveScore('ai');
                myTris.stateOfMatch = 0;
                $("#msg_box").text("Stupid IA won!");
                break;
        }

        //Read current score ad set results
        var current_situation = scoreManager.readScore()
        $("#player_score_value").text(current_situation['currentPlayerScore']);
        $("#player_ia_value").text(current_situation['currentAiScore']);
        $("#match_value").text(current_situation['currentRound']);

    },


    //Clean field
    cleanField: function(field) {
        for (var x = 0; x < field.length; x++) {
            var line = field[x];
            for (var y = 0; y < line.length; y++) {
                $("#" + (x + +1) + "-" + (y + +1)).empty();
                myTris.field[x][y] = 0;
            }
        }
    },


    //Restart match
    restartMatch: function() {
        myTris.stateOfMatch = 1;
        myTris.cleanField(myTris.field);
        $("#msg_box").text("Play!");
    },


    //Reset IA and match
    resetAI: function() {
        scoreManager.resetScore();
        myTris.stateOfMatch = 1;
        myTris.cleanField(myTris.field);
        $.cookie(scoreManager.ai_cookie_name, 0);
        $.cookie(scoreManager.player_cookie_name, 0);
        $("#player_score_value").text("0");
        $("#player_ia_value").text("0");
        $("#msg_box").text("Play!");
        $("#match_value").text("1");
    },


    //Check current field state
    checkCurrentState: function(field) {

        //Check for winner in rows
        for (var i = 0; i < field.length; i++) {
            var player_hit = 0;
            var stupid_ia_hit = 0;
            var line = field[i];
            for (var j = 0; j < line.length; j++) {
                switch (line[j]) {
                    case 1:
                        player_hit++;
                        break;
                    case 2:
                        stupid_ia_hit++;
                        break;
                }
                if (player_hit === 3) return 4;
                if (stupid_ia_hit === 3) return 5;
            }
        }

        //Check for winner in column
        for (var i = 0; i < field[0].length; i++) {
            var player_hit = 0;
            var stupid_ia_hit = 0;
            for (var j = 0; j < field.length; j++) {
                switch (field[j][i]) {
                    case 1:
                        player_hit++;
                        break;
                    case 2:
                        stupid_ia_hit++;
                        break;
                }
                if (player_hit === 3) return 4;
                if (stupid_ia_hit === 3) return 5;
            }
        }

        //Check for winneer in cross            
        var player_hit_left = 0;
        var player_hit_right = 0;
        var stupid_ia_hit_left = 0;
        var stupid_ia_hit_right = 0;
        for (var i = 0; i < field.length; i++) {
            switch (field[i][i]) {
                case 1:
                    player_hit_left++;
                    break;
                case 2:
                    stupid_ia_hit_left++;
                    break;
            }
            var reverse_i = field.length - i - 1;
            switch (field[i][field.length - i - 1]) {
                case 1:
                    player_hit_right++;
                    break;
                case 2:
                    stupid_ia_hit_right++;
                    break;
            }
        }
        if ((player_hit_left === 3) || (player_hit_right === 3)) return 4;
        if ((stupid_ia_hit_left === 3) || (stupid_ia_hit_right === 3)) return 5;

        //Check for even match
        var count_box = 0;
        for (var i = 0; i < field.length; i++) {
            var line = field[i];
            for (var j = 0; j < line.length; j++) {
                if (line[j] !== 0) count_box++;
            }
        }
        if (count_box === 9) return 3;

        //No results
        return 6;
    }
};