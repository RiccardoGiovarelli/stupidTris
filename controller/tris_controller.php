<?php

// Include main class
require_once ('../model/class.TrisMainClass.php');

// Switch controller request
switch (filter_input(INPUT_POST, 'request')) {
	
	case 'nextMoveRequest' :
		$tris_main_object = new TrissMainClass ();
		$nextMove = $tris_main_object->getNextMove ( filter_input(INPUT_POST, 'currentGrid') );
		unset($tris_main_object);
		if ($nextMove) echo $nextMove;
		break;
                
   case 'saveScore' :
   		$tris_main_object = new TrissMainClass ();
		$saveResponse = $tris_main_object->saveScore ( filter_input(INPUT_POST, 'who') );
		unset($tris_main_object);
		if ($saveResponse) echo $saveResponse;
		break;
        
   case false:
		//Do something!
		break;
}
