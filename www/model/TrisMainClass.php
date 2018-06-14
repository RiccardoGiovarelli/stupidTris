<?php


/**
* Triss Main Class
*
* @author  Riccardo Giovarelli
*/
class TrissMainClass {

    public function __construct($currentGrid){

        $this->$myGridVector = explode(',', $currentGrid);

        $numberOfMove = 0;
        foreach ($myGridVector as $currentBox) {
            if ($currentBox != 0) $numberOfMove++;
        }

        $cursor = 0;
        for ($i = 0; $i < 3; $i++) {
            for ($j = 0; $j < 3; $j++) {
                $myGridMatrix[$i][$j] = $currentGrid[$cursor];
                $cursor++;
            }
        }

        $this->numberOfMovesLeft = 9 - $numberOfMove;
        $this->$numberOfMove = $numberOfMove;
        $this->$aiMarker = 2;
        $this->$playerMarker = 1;
        $this->$myGridMatrix = $myGridMatrix;

        unset($numberOfMove, $currentGrid, $cursor, $myGridMatrix);
    }


}