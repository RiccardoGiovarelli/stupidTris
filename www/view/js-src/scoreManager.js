export var scoreManager = {


    //////////////	
    //Properties//
    //////////////
    round_cookie_name: 'current-round',
    ai_cookie_name: 'current-AI-score',
    player_cookie_name: 'current-PLAYER-score',


    ///////////
    //Methods//
    ///////////

    //Save score
    saveScore: function(who) {

        var current_situation = scoreManager.readScore();

        switch (who) {
            case 'ai':
                $.cookie(scoreManager.round_cookie_name, +current_situation['currentRound'] + +1);
                $.cookie(scoreManager.ai_cookie_name, +current_situation['currentAiScore'] + +1);
                break;
            case 'player':
                $.cookie(scoreManager.round_cookie_name, +current_situation['currentRound'] + +1);
                $.cookie(scoreManager.player_cookie_name, +current_situation['currentPlayerScore'] + +1);
                break;

        }
    },


    //Reset score table
    resetScore: function() {

        var reset_promise = new Promise(

            function(resolve, reject) {

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
                xhttp.send("request=resetScoreTable");

            }
        );
    },


    //Read score table
    readScore: function() {

        var toReturn = [];

        toReturn['currentRound'] = $.cookie(scoreManager.round_cookie_name);
        toReturn['currentAiScore'] = $.cookie(scoreManager.ai_cookie_name);
        toReturn['currentPlayerScore'] = $.cookie(scoreManager.player_cookie_name);

        toReturn['currentRound'] = (toReturn['currentRound'] === undefined) ? 0 : toReturn['currentRound'];
        toReturn['currentAiScore'] = (toReturn['currentAiScore'] === undefined) ? 0 : toReturn['currentAiScore'];
        toReturn['currentPlayerScore'] = (toReturn['currentPlayerScore'] === undefined) ? 0 : toReturn['currentPlayerScore'];

        return toReturn;
    }
}