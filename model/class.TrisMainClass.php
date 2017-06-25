<?php
class TrissMainClass {
	protected $db_host = 'localhost';
	protected $db_user = 'root';
	protected $db_password = 'mysql';
	protected $db_name = 'u296297717_kal';
	
	
	public function getNextMove($current_grid) {
		
		//Variables
		$result = array();
		$position = 0;
		$free_count = 0;
		
		//Array of grid
		$my_grid = explode(',', $current_grid);

		//Number of moves
		$number_of_move = 0;
		foreach ($my_grid as $yek => $value) {
			if ($value != 0) {
				$number_of_move++;
			}
		}
		$number_of_move = 9 - $number_of_move;
		
		//Generate move
		$move = (rand(1, $number_of_move) - 1);
		//Find my move on grid
		while (!count($result)) {
			if ($my_grid[$position] == 0 and $free_count == $move) {
				$result[0] = floor($position/3);
				$result[1] = ($position%3);
				
				
			} else if ($my_grid[$position] == 0 and $free_count != $move) {
				$free_count++;
				$position++;
			} else if ($my_grid[$position] != 0) {
				$position++;
			}
		}

		
		//Return move
		if (count($result)) echo json_encode($result, true);
	
	}
}