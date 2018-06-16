<?php
require_once ('../model/class.TrisMainClass.php');

$requestFiltered = filter_input(INPUT_POST, 'request');
$paramFiltered = filter_input(INPUT_POST, 'currentGrid');

switch ($requestFiltered) {
	
	case 'nextMoveRequest':

		$trisMainObject = new TrissMainClass($paramFiltered);
		$nextMove = $trisMainObject->findBestMove();
		unset($trisMainObject);
		if ($nextMove) echo json_encode($nextMove);
		break;
        
   default:
	return false;
}