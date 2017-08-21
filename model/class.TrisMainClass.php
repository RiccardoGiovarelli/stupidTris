<?php


/**
* <h1>Triss Main Class</h1>
*
* @author  Riccardo Giovarelli
* @version 1.0 
*/
class TrissMainClass {


    protected $db_host = 'localhost';
    protected $db_user = 'root';
    protected $db_password = 'mysql';
    protected $db_name = 'StupidTris';


	/**
	 * Returns the score table current state 
	 * 
	 * @return	string	score table current state
	 */
	public function readScoreTable() {
	
		//DB connection
		$connection = @mysqli_connect($this->db_host, $this->db_user , $this->db_password);
		if (!$connection) {
			$current_error = [
				"success" => "false",
				"error" => mysqli_connect_error()
			];
			echo json_encode($current_error, true);
			return;
		}
		
		//Executing query
		$select_all_result = @mysqli_query($connection, "SELECT * FROM `StupidTris`.`st_score`");
		if (!$select_all_result) {
			$current_error = [
				"success" => "false",
				"error" => mysqli_error($connection)
			];
			echo json_encode($current_error, true);
			@mysqli_close($connection);
			return;
		}
		
		//Building results
		$i = 0;
		while ($row = mysqli_fetch_array($select_all_result)) {
			$select_results_array[$i]['round'] = $row['round'];
			$select_results_array[$i]['player'] = $row['player'];
			$select_results_array[$i]['ia'] = $row['ia'];
			$i++;
		}

		//Return table state
		if (count($select_results_array)) echo json_encode($select_results_array, true);
		
		@mysqli_close($connection);
		return;
	}


	/**
	 * Returns the next move for IA basing on current 
	 * grid situation and IA logic
	 *
	 * @param	current_grid	current grid situation
	 * @return	string			next move
	 */
    public function getNextMove($current_grid) {

        //Variables
        $result = array();
        $position = 0;
        $free_count = 0;

        //Array of grid
        $my_grid = explode(',', $current_grid);

        //Number of moves
        $number_of_move = 0;
        foreach ($my_grid as $value) {
            if ($value != 0) $number_of_move++;
        }
        $number_of_move = 9 - $number_of_move;

        //Generate move
        $move = (rand(1, $number_of_move) - 1);
        
        //Find my move on grid
        while (!count($result)) {
            switch (true) {
                case ($my_grid[$position] == 0 and $free_count == $move):
                    $result[0] = floor($position / 3);
                    $result[1] = ($position % 3);
                    break;
                case ($my_grid[$position] == 0 and $free_count != $move):
                    $free_count++;
                    $position++;
                    break;
                case ($my_grid[$position] != 0):
                    $position++;
                    break;
            }
        }
        
        //Return move
        if (count($result)) echo json_encode($result, true);
        return;
    }
    
    
    /**
	 * Save the score of match
	 *
	 * @param	who		the winner of the last match
	 * @return	string	the result of save
	 */
    public function saveScore($who) {

		//DB connection
		$connection = @mysqli_connect($this->db_host, $this->db_user , $this->db_password);
		if (!$connection) {
			$current_error = [
				"success" => "false",
				"error" => mysqli_connect_error()
			];
			echo json_encode($current_error, true);
			return;
		}
		
		//Building query
		switch ($who) {
			case 'player':
				$insert_query = "INSERT INTO `StupidTris`.`st_score` (`round`, `player`, `ia`) VALUES (NULL, '1', '0');";
				break;
			case 'ia':
				$insert_query = "INSERT INTO `StupidTris`.`st_score` (`round`, `player`, `ia`) VALUES (NULL, '0', '1');";
				break;		
		}
		
		//Executing query
		$insert_result = @mysqli_query($connection, $insert_query);
		if (!$insert_result) {
			$current_error = [
				"success" => "false",
				"error" => mysqli_error($connection)
			];
			echo json_encode($current_error, true);
			@mysqli_close($connection);
			return;
		}
		
		//Results
		echo json_encode(["success" => "true"], true);
		@mysqli_close($connection);
		return;
	}
	
	
	/**
	 * Clear the table of score
	 *
	 * @return	string	the result of clear
	 */
	public function resetScoreTable() {
		
		//DB connection
		$connection = @mysqli_connect($this->db_host, $this->db_user , $this->db_password);
		if (!$connection) {
			$current_error = [
				"success" => "false",
				"error" => mysqli_connect_error()
			];
			echo json_encode($current_error, true);
			return;
		}
		
		//Executing query
		$truncate_result = @mysqli_query($connection, "TRUNCATE TABLE `StupidTris`.`st_score`");
		if (!$truncate_result) {
			$current_error = [
				"success" => "false",
				"error" => mysqli_error($connection)
			];
			echo json_encode($current_error, true);
			@mysqli_close($connection);
			return;
		}
		
		//Results
		echo json_encode(["success" => "true"], true);
		@mysqli_close($connection);
		return;
	}
	
}
