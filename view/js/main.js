$(document).ready(function () {

    //Add event listener
    document.getElementById("tris_grid").addEventListener("click", function (e) {
        nowWePlayTris.manageMove(e);
    });

    //New play object
    var nowWePlayTris = Object.create(myTris);
    nowWePlayTris.firstPlayer = 'user';

});

//Play object
var myTris = {

    //////////////	
    //Properties//
    //////////////
    turnNumber: 1,
    firstPlayer: '',
    faX: 'fa fa-times',
    fa0: 'fa fa-circle-o',
    field: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],

    ///////////
    //Methods//
    ///////////

    //Manage the current move
    manageMove: function (e) {

        //Check if match ended
        if (!this.checkCurrentState(this.field)) return false;

        //Get clicked square id
        matched = e.target.id.match(/td-(\d)-(\d)/);

        //Make current move for player
        this.makeMove(matched[1], matched[2], 'player');

        //Check if match ended
        if (!this.checkCurrentState(this.field)) return false;

        //Check the state of the match
        response = this.respondToMove();
        if (response) {

            //IA make her move
            this.makeMove(response[0], response[1], 'ia');

        }

    },

    //Make move (graphic)
    makeMove: function (x, y, who) {

        switch (who) {
            case 'player':
                $("#" + x + "-" + y).addClass(this.faX);
                this.field[x - 1][y - 1] = 1;
                break;
            case 'ia':
                $("#" + (+x + 1) + "-" + (+y + 1)).addClass(this.fa0);
                this.field[x][y] = 2;
                break;
        }

    },

    checkCurrentState: function (field) {

        var count_box = 0;
        for (var i = 0; i < field.length; i++) {
            var line = field[i];
            for (var j = 0; j < line.length; j++) {
                if (line[j] !== 0)
                    count_box++;
            }
        }

        if (count_box === 9) return false;

        return true;
    },

    //Generate the response
    respondToMove: function () {

        var nextMove = '';

        //New Ajax
        var xhttp = new XMLHttpRequest();

        //State management
        xhttp.onreadystatechange = function () {
            nextMove = (this.readyState === 4 && this.status === 200) ? JSON.parse(this.responseText) : false;
        };

        //Ajax call
        xhttp.open("POST", "../controller/tris_controller.php", false);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("request=nextMoveRequest" + "&currentGrid=" + this.field);

        //Return value
        return nextMove;

    }

}


function isEven(n) {
    return n === parseFloat(n) ? !(n % 2) : void 0;
}




