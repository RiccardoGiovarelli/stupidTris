

$(document).ready(function () {

    //Add event listener
    document.getElementById("tris_grid").addEventListener("click", function (e) {
        nowWePlayTris.manageMove(e);
    });

    //New play object
    var nowWePlayTris = Object.create(myTris);
    nowWePlayTris.firstPlayer = 'user';

});


var myTris = {

    //////////////	
    //Properties//
    //////////////
    
    stateOfScoreTable: [],
    stateOfMatch: 1,
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

		if (myTris.stateOfMatch == 0) return;

        //Get clicked square id
        if((matched = e.target.id.match(/td-(\d)-(\d)/)) == null) return;

        //Make current move for player
		myTris.makeMove(matched[1], matched[2], 'player');

        //Check if match ended
        if ((current_result = myTris.checkCurrentState(myTris.field)) !== 6) {
            myTris.manageResults(current_result);
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
				if (xhttp.readyState === 4 && xhttp.status === 200) {
					resolve(JSON.parse(xhttp.responseText));
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
				if ((current_result = myTris.checkCurrentState(myTris.field)) !== 6) {
					myTris.manageResults(current_result);
					return;
				}  
		});
		
    },


    //Make move (graphic)
    makeMove: function (x, y, who) {
		switch (who) {
			case 'player':
				$("#" + x + "-" + y).addClass(myTris.faX);
				myTris.field[x - 1][y - 1] = 1;
				return true;
				break;
			case 'ia':
				$("#" + (+x + 1) + "-" + (+y + 1)).addClass(myTris.fa0);
				myTris.field[x][y] = 2;
				return true;
				break;
			return false;
		}
    },
    
    
    //Save score
    saveScore: function (who) {
				
		//Building promise to save score
		var response_promise = new Promise(

			function(resolve, reject) {

			//New Ajax
			var xhttp = new XMLHttpRequest();

			//State management
			xhttp.onreadystatechange = function () {
				if (xhttp.readyState === 4 && xhttp.status === 200) {
					resolve(JSON.parse(xhttp.responseText));
				}
			};

			//Ajax call
			xhttp.open("POST", "../controller/tris_controller.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("request=saveScore" + "&who=" + who);
			
		});
    },


    //Reset score table
    resetScore: function () {
		
		//Building promise to reset score table
		var response_promise = new Promise(

			function(resolve, reject) {

			//New Ajax
			var xhttp = new XMLHttpRequest();

			//State management
			xhttp.onreadystatechange = function () {
				if (xhttp.readyState === 4 && xhttp.status === 200) {
					resolve(JSON.parse(xhttp.responseText));
				}
			};

			//Ajax call
			xhttp.open("POST", "../controller/tris_controller.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("request=resetScoreTable");
			
		});
    },
    
    
    //Reset score table
    readScore: function () {
		
		//Building promise to reset score table
		var response_promise = new Promise(

			function(resolve, reject) {

			//New Ajax
			var xhttp = new XMLHttpRequest();

			//State management
			xhttp.onreadystatechange = function () {
				if (xhttp.readyState === 4 && xhttp.status === 200) {
					resolve(JSON.parse(xhttp.responseText));
				}
			};

			//Ajax call
			xhttp.open("POST", "../controller/tris_controller.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("request=readScoreTable");
			
		});

		response_promise.then(
			function(response) {
			myTris.stateOfScoreTable = response;
		});
    },
    
    
    //Manage final results
    manageResults: function (state) {

        switch (state) {
			case 3:
			myTris.stateOfMatch = 0;
			$( "#msg_box" ).css("visibility", 'visible');
			$( "#msg_box" ).text("Even!");
			$( "#msg_button" ).css("visibility", 'visible');
				break;
			case 4:
			myTris.saveScore('player');
			myTris.stateOfMatch = 0;
			$( "#msg_box" ).css("visibility", 'visible');
			$( "#msg_box" ).text("You won!");
			$( "#msg_button" ).css("visibility", 'visible');
				break;
			case 5:
			myTris.saveScore('ia');
			myTris.stateOfMatch = 0;
			$( "#msg_box" ).css("visibility", 'visible');
			$( "#msg_box" ).text("Stupid IA won!");
			$( "#msg_button" ).css("visibility", 'visible');
				break;
		}
        
        //TODO: Manage Even or Victory

    },
    
    
    //Clean field
	cleanField: function (field) {
        for (var x = 0; x < field.length; x++) {
            var line = field[x];
            for (var y = 0; y < line.length; y++) {
                $("#" + (x + +1) + "-" + (y + +1)).removeClass(myTris.faX + " " + myTris.fa0);
                myTris.field[x][y] = 0;
            }
        }
    },
    
    
    //
    restartMatch: function () {
		console.log(myTris.readScore());
		myTris.stateOfMatch = 1;
		myTris.cleanField(myTris.field);
	},


	//Check current field state
    checkCurrentState: function (field) {
        
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
