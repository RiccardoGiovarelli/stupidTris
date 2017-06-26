<?php

// Include main class
require_once ('../model/class.TrisMainClass.php');

// Switch controller request
switch (filter_input(INPUT_POST, 'request')) {
	
	case 'nextMoveRequest' :
		$tris_main_object = new TrissMainClass ();
		$nextMove = $tris_main_object->getNextMove ( $_POST ['currentGrid'] );
		if ($nextMove)
			echo $nextMove;
		break;
                
        case false:
            //Do something!
            break;
}
