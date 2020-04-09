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

/**
* Triss Main Class
*
* @author  Riccardo Giovarelli
*/
class TrissMainClass {

    public function __construct($currentGrid) {
        
        $cursor = 0;
        $myGridVector = explode(',', $currentGrid);
        for ($i = 0; $i < 3; $i++) {
            for ($j = 0; $j < 3; $j++) {
                $myGridMatrix[$i][$j] = intval($myGridVector[$cursor]);
                $cursor++;
            }
        }

        $this->aiMarker = 2;
        $this->playerMarker = 1;
        $this->myGridMatrix = $myGridMatrix;

        unset($cursor, $myGridMatrix, $myGridVector);
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
                    case $this->playerMarker:
                        $playerHit++;
                        break;
                    case $this->aiMarker:
                        $stupidAiHit++;
                        break;
                }
                if ($playerHit == 3) return 5;
                if ($stupidAiHit == 3) return 10;
            }
        }
   
        // Column
        for ($i = 0; $i < 3; $i++) {
            $playerHit = 0;
            $stupidAiHit = 0;
            for ($j = 0; $j < 3; $j++) {
                switch ($field[$j][$i]) {
                    case $this->playerMarker:
                        $playerHit++;
                        break;
                    case $this->aiMarker:
                        $stupidAiHit++;
                        break;
                }
                if ($playerHit == 3) return 5;
                if ($stupidAiHit == 3) return 10;
            }
        }
   
        // Cross
        $playerHitLeft = 0;
        $playerHitRight = 0;
        $stupidAiHitLeft = 0;
        $stupidAiHitRight = 0;
        for ($i = 0; $i < 3; $i++) {
            switch ($field[$i][$i]) {
                case $this->playerMarker:
                    $playerHitLeft++;
                    break;
                case $this->aiMarker:
                    $stupidAiHitLeft++;
                    break;
            }
            switch ($field[$i][2 - $i]) {
                case $this->playerMarker:
                    $playerHitRight++;
                    break;
                case $this->aiMarker:
                    $stupidAiHitRight++;
                    break;
            }
        }
        if (($playerHitLeft == 3) || ($playerHitRight == 3)) return 5;
        if (($stupidAiHitLeft == 3) || ($stupidAiHitRight == 3)) return 10;
   
        // Even
        $countBox = 0;
        for ($i = 0; $i < 3; $i++) {
            for ($j = 0; $j < 3; $j++) {
                if ($field[$i][$j] != 0) $countBox++;
            }
        }
        if ($countBox == 9) return 3;
    
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
    public function  minimax($field, $isMax) {

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
                    $field[$i][$j] = $this->aiMarker;
                        $rank = max($rank, $this->minimax($field, !$isMax));
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
                        $field[$i][$j] = $this->playerMarker;
                        $rank = min($rank, $this->minimax($field, !$isMax));
                        $field[$i][$j] = 0;
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
    * Return the best move for AI
    *
    * @param $field Field for the current Tris match
    * @return The best move for AI
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
                    $this->myGridMatrix[$i][$j] = $this->aiMarker;
                    $moveVal = $this->minimax($this->myGridMatrix, false);
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
