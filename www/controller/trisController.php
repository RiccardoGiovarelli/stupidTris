<?php
require_once ('../model/class.TrisMainClass.php');

$requestFiltered = filter_input(INPUT_POST, 'request');

switch (requestFiltered) {
	
	case 'nextMoveRequest' :
		$trisMainObject = new TrissMainClass();
		$nextMove = $trisMainObject->getNextMove(filter_input(INPUT_POST, 'currentGrid'));
		unset($trisMainObject);
		if ($nextMove) echo $nextMove;
		break;
        
   default:
	return false;
}