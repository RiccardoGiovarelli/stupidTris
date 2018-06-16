<?php
/**
* Triss Main Class
*
* @author  Riccardo Giovarelli
*/
class TrissMainClass {

    public function __construct($currentGrid) {

        $this->myGridVector = explode(',', $currentGrid);
        
        $numberOfMove = 0;
        foreach ($this->myGridVector as $currentBox) {
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
        $this->numberOfMove = $numberOfMove;
        $this->aiMarker = 2;
        $this->playerMarker = 1;
        $this->myGridMatrix = $myGridMatrix;

        unset($numberOfMove, $currentGrid, $cursor, $myGridMatrix);
    }


    /**
    * Method checkCurrentState
    *
    * Check current field state
    *
    * @param $field Field for the current Tris match
    * @return 3 if the match is even, 5 if player wins,
    * 10 if Ai win or 6 if there aren't results
    */
    public function checkCurrentState($field) {
        
        // Rows
        for ($i = 0; $i < 3; $i++) {
            $playerHit = 0;
            $stupidAiHit = 0;
            for ($j = 0; $j < 3; $j++) {
                switch ($field[$i][$j]) {
                    case 1:
                        $playerHit++;
                        break;
                    case 2:
                        $stupidAiHit++;
                        break;
                }
                if ($playerHit === 3) return 5;
                if ($stupidAiHit === 3) return 10;
            }
        }
   
        // Column
        for ($i = 0; $i < 3; $i++) {
            $playerHit = 0;
            $stupidAiHit = 0;
            for ($j = 0; $j < 3; $j++) {
                switch ($field[$j][$i]) {
                    case 1:
                        $playerHit++;
                        break;
                    case 2:
                        $stupidAiHit++;
                        break;
                }
                if ($playerHit === 3) return 5;
                if ($stupidAiHit === 3) return 10;
            }
        }
   
        // Cross
        $playerHitLeft = 0;
        $playerHitRight = 0;
        $stupidAiHitLeft = 0;
        $stupidAiHitRight = 0;
        for ($i = 0; $i < 3; $i++) {
            switch ($field[$i][$i]) {
                case 1:
                    $playerHitLeft++;
                    break;
                case 2:
                    $stupidAiHitLeft++;
                    break;
            }
            switch ($field[$i][2 - $i]) {
                case 1:
                    $playerHitRight++;
                    break;
                case 2:
                    $stupidAiHitRight++;
                    break;
            }
        }
        if (($playerHitLeft === 3) || ($playerHitRight === 3)) return 5;
        if (($stupidAiHitLeft === 3) || ($stupidAiHitRight === 3)) return 10;
   
        // Even
        $countBox = 0;
        for ($i = 0; $i < 3; $i++) {
            for ($j = 0; $j < 3; $j++) {
                if ($field[$i][$j] !== 0) $countBox++;
            }
        }
        if ($countBox === 9) return 3;
    
        // No results
        return 6;
   }
   

    /**
    * Method minimax
    *
    * Implement the Minimax algorithm
    *
    * @param $field Field for the current Tris match
    * @param $depth The depth of the recursion
    * @param $isMax Current turn: maximizer or minimizer
    * @return The best rank for all the possible ways 
    * the game can go
    */
    public function  minimax($field, $depth, $isMax) {
    
        $state = $this->checkCurrentState($field);
   
        switch ($state) {
    
        case '10':
            return 10;
    
        case '5':
            return -10;
    
        case '3':
            return 0;
        }
   
        switch ($isMax) {
    
        case true:
            $rank = -1000;
            for ($i = 0; $i < 3; $i++) {
                for ($j = 0; $j < 3; $j++) {
                    if ($field[$i][$j] == 0 ) {
                    $field[$i][$j] = 1;
                        $rank = max($rank, $this->minimax($field, $depth+1, !$isMax));
                        $field[$i][$j] = 0;
                    }
                }
            }
            return $rank;
            break;
    
        case false:
            $rank = 1000;
            for ($i = 0; $i < 3; $i++) {
                for ($j = 0; $j < 3; $j++) {
                if ($field[$i][$j] == 0 ) {
                        $field[i][j] = 2;
                        $rank = min($rank, $this->minimax($field, $depth+1, !$isMax));
                        $field[i][j] = 0;
                    }
                }
            }
            return $rank;
            break;
    
        default:
            return false;
        }
   }
   
    /**
    * Method findBestMove
    *
    * Return the best move for the player
    *
    * @param $field Field for the current Tris match
    * @return The best move for the player
    */
    public function findBestMove() {

        $bestVal = -1000;
        $bestMove = [
            "row" => -1,
            "col" => -1
        ];
    
        for ($i = 0; $i < 3; $i++) {
            for ($j = 0; $j < 3; $j++) {
                if ($this->myGridMatrix[$i][$j] == 0) {
                    $this->myGridMatrix[$i][$j] = 1;
                    $moveVal = $this->minimax($this->myGridMatrix, 0, false);
                    $this->myGridMatrix[$i][$j] = 0;
                    if ($moveVal > $bestVal) {
                        $bestMove['row'] = $i;
                        $bestMove['col'] = $j;
                        $bestVal = $moveVal;
                    }
                }
            }
        }
        
        return $bestMove;
   }
}