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

        //Get clicked square id
        matched = e.target.id.match(/td-(\d)-(\d)/);

        //Make current move for player
        this.makeMove(matched[1], matched[2], 'player');

        //Check if match ended
        if ((current_result = this.checkCurrentState(this.field)) !== 6) {
            this.manageResults(current_result);
            return;
        }
        
        //Building promise to respond to player
		var response_promise = new Promise(

			function(resolve, reject) {

			var nextMove = '';

			//New Ajax
			var xhttp = new XMLHttpRequest();

			//State management
			xhttp.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {

					resolve(JSON.parse(this.responseText));
				}
			};

			//Ajax call
			xhttp.open("POST", "../controller/tris_controller.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("request=nextMoveRequest" + "&currentGrid=" + myTris.field);
		});

		response_promise.then(

			function(response) {

				myTris.makeMove(response[0], response[1], 'ia');
				
				//Check if match ended
				if ((current_result = this.checkCurrentState(myTris.field)) !== 6) {
					myTris.manageResults(current_result);
					return;
				}  
		}).catch(
		
			function(reason) {
				//TODO: Something in case of errors
		});
		
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


    //Manage final results
    manageResults: function (state) {

        console.log("Risultato = " + state);
        
        
        switch (state) {
			case 4:
			$( "#msg_box" ).text("You won!");
			$( "#msg_button" ).css("visibility", 'visible');
				break;
			case 5:
			$( "#msg_box" ).text("Stupid IA won!");
			$( "#msg_button" ).css("visibility", 'visible');
				break;
		}
        
       
        //TODO: Manage Even or Victory

    },


    checkCurrentState: function (field) {

        //Check for even match
        var count_box = 0;
        for (var i = 0; i < field.length; i++) {
            var line = field[i];
            for (var j = 0; j < line.length; j++) {
                if (line[j] !== 0) count_box++;
            }
        }
        if (count_box === 9) return 3;
        
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
        if ((player_hit_left === 3)||(player_hit_right === 3)) return 4;
        if ((stupid_ia_hit_left === 3)||(stupid_ia_hit_right === 3)) return 5;

        //No results
        return 6;
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
        xhttp.open("POST", "../controller/tris_controller.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("request=nextMoveRequest" + "&currentGrid=" + this.field);

        //Return value
        return nextMove;
    }
};
