export var scoreManager = {

    //Save score
    saveScore: function(who) {

        var save_promise = new Promise(

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
                xhttp.send("request=saveScore" + "&who=" + who);

            }
        );
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

        var read_promise = new Promise(

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
                xhttp.send("request=readScoreTable");

            }
        );

        read_promise.then();

        return read_promise;
    }
}