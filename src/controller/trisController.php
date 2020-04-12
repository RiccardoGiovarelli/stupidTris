<?php

// This file is part of Stupid Tris.

// Stupid Tris is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Stupid Tris is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Stupid Tris.  If not, see <http://www.gnu.org/licenses/>.

// Copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>

require_once ('../model/class.TrisMainClass.php');

$requestFiltered = filter_input(INPUT_POST, 'request');
$paramFiltered = filter_input(INPUT_POST, 'currentGrid');

switch ($requestFiltered) {
	
	case 'nextMoveRequest':

		$trisMainObject = new TictactoeMainClass($paramFiltered);
		$nextMove = $trisMainObject->findBestMove();
		unset($trisMainObject);
		if ($nextMove) echo json_encode($nextMove);
		break;
        
   default:
	return false;
}