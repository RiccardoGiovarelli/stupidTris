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
* Tic-tac-toe Main Class
*
* @author Riccardo Giovarelli
* @copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>
*/
class TictactoeMainClass {


    /**
    * Class constructor
    *
    * @param    Array   $currentField  Current Tic-tac-toe field
    */
    public function __construct($currentField) {
        
        // Init grid
        $cursor = 0;
        $myGridVector = explode(',', $currentField);
        for ($i = 0; $i < 3; $i++) {
            for ($j = 0; $j < 3; $j++) {
                $myFiledMatrix[$i][$j] = intval($myGridVector[$cursor]);
                $cursor++;
            }
        }

        // Init property
        $this->aiMarker = 2;
        $this->playerMarker = 1;
        $this->myFieldMatrix = $myFiledMatrix;

        unset($cursor, $myFiledMatrix, $myGridVector);
    }



    /**
    * Method minimax
    *
    * Implement the Minimax algorithm
    *
    * @param    Array   $field  Field for the current Tic-tac-toe match
    * @param    Boolean $isMax  Current turn: maximizer or minimizer
    * @return   Integer The best rank for the current situation
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
    * @return   Array   The best move for AI
    */
    public function findBestMove() {


        $bestVal = -1000;
        $bestMove = [
            "row" => -1,
            "col" => -1
        ];
    

        for ($i = 0; $i < 3; $i++) {
            for ($j = 0; $j < 3; $j++) {
                if ($this->myFieldMatrix[$i][$j] == 0) {
                    $this->myFieldMatrix[$i][$j] = $this->aiMarker;
                    $moveVal = $this->minimax($this->myFieldMatrix, false);
                    $this->myFieldMatrix[$i][$j] = 0;
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



    /**
    * Method checkCurrentState
    *
    * Check current field state
    *
    * @param    Array   $field  Field for the current Tic-tac-toe match
    * @return   Integer 3 if the match is even, 5 if player wins, 
    *                   10 if Ai win or 6 if there aren't results
    */
    public function checkCurrentState($field) {


        $hitMatrix = [
            'palyer' => [
                'row' => 0,
                'column' => 0,
                'cross' => [
                    'right' => 0,
                    'left' => 0
                ]
            ],
            'stupidAi' => [
                'row' => 0,
                'column' => 0,
                'cross' => [
                    'right' => 0,
                    'left' => 0
                ]
            ],
            'boxes' => 0
        ];


        // LOOP LEVEL 1
        for ($i = 0; $i < 3; $i++) {


            // Rows count reset
            $hitMatrix['palyer']['row'] = 0;
            $hitMatrix['stupidAi']['row'] = 0;

            // Column count reset
            $hitMatrix['palyer']['column'] = 0;
            $hitMatrix['stupidAi']['column'] = 0;


            //Cross win check
            switch ($field[$i][$i]) {
                case $this->playerMarker:
                    $hitMatrix['palyer']['cross']['left']++;
                    break;
                case $this->aiMarker:
                    $hitMatrix['stupidAi']['cross']['left']++;
                    break;
            }
            switch ($field[$i][2 - $i]) {
                case $this->playerMarker:
                    $hitMatrix['palyer']['cross']['right']++;
                    break;
                case $this->aiMarker:
                    $hitMatrix['stupidAi']['cross']['right']++;
                    break;
            }
            if (($hitMatrix['palyer']['cross']['left'] == 3) || ($hitMatrix['palyer']['cross']['right'] == 3)) return 5;
            if (($hitMatrix['stupidAi']['cross']['left'] == 3) || ($hitMatrix['stupidAi']['cross']['right'] == 3)) return 10;


            // LOOP LEVEL 2
            for ($j = 0; $j < 3; $j++) {


                // Rows win check
                switch ($field[$i][$j]) {
                    case $this->playerMarker:
                        $hitMatrix['palyer']['row']++;
                        break;
                    case $this->aiMarker:
                        $hitMatrix['stupidAi']['row']++;
                        break;
                }
                if ($hitMatrix['palyer']['row'] == 3) return 5;
                if ($hitMatrix['stupidAi']['row'] == 3) return 10;


                // Columns win check
                switch ($field[$j][$i]) {
                    case $this->playerMarker:
                        $hitMatrix['palyer']['column']++;
                        break;
                    case $this->aiMarker:
                        $hitMatrix['stupidAi']['column']++;
                        break;
                }
                if ($hitMatrix['palyer']['column'] == 3) return 5;
                if ($hitMatrix['stupidAi']['column'] == 3) return 10;


                // Count boxes
                if ($field[$i][$j] != 0) $hitMatrix['boxes']++;
            }
        }


        // Even result check
        if ($hitMatrix['boxes'] == 9) return 3;
    

        // No results
        return 6;
   }
}
