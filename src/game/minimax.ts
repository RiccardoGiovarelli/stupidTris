// This file is part of Sloth's Tic-tac-toe.

// Sloth's Tic-tac-toe is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Sloth's Tic-tac-toe is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Sloth's Tic-tac-toe.  If not, see <http://www.gnu.org/licenses/>.

// Copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>


/**
 * Minimax
 *
 * @author Riccardo Giovarelli
 * @copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>
 */
export default class Minimax {

    // Class properties
    aiMarker: number;
    playerMarker: number;
    evenMaker: number;
    noresultsMaker: number;
    currentField: any;
    checkCurrentState: any;
    dimension: number;


    /**
     * Class constructor
     *
     * @param   Object  currentField    Current Tic-tac-toe field
     */
    constructor(currentField: any, checkCurrentState: any, aiMarker: number, playerMarker: number, evenMaker: number, noresultsMaker: number, dimension: number) {

        // Init properties
        this.aiMarker = aiMarker;
        this.playerMarker = playerMarker;
        this.evenMaker = evenMaker;
        this.noresultsMaker = noresultsMaker;
        this.currentField = currentField;
        this.checkCurrentState = checkCurrentState;
        this.dimension = dimension;
    }


    /**
     * Method minimax
     *
     * Implement the Minimax algorithm
     *
     * @param    Object     field  Field for the current Tic-tac-toe match
     * @param    Boolean    isMax  Current turn: maximizer or minimizer
     * @return   Number     The best rank for the current situation
     */
    minimax(field: any, isMax: boolean): number {

        const state = this.checkCurrentState(field, this.playerMarker, this.aiMarker, this.evenMaker, this.noresultsMaker, 'status');

        switch (state) {
            case this.aiMarker:
                return 10;
            case this.playerMarker:
                return -10;
            case this.evenMaker:
                return 0;
        }

        switch (isMax) {
            case true:
                let rankTrue = -1000;
                for (let i = 0; i < this.dimension; i++) {
                    for (let j = 0; j < this.dimension; j++) {
                        if (field[i][j] === 0) {
                            field[i][j] = this.aiMarker;
                            rankTrue = Math.max(rankTrue, this.minimax(field, !isMax));
                            field[i][j] = 0;
                        }
                    }
                }
                return rankTrue;
            case false:
                let rankFalse = 1000;
                for (let i = 0; i < this.dimension; i++) {
                    for (let j = 0; j < this.dimension; j++) {
                        if (field[i][j] === 0) {
                            field[i][j] = this.playerMarker;
                            rankFalse = Math.min(rankFalse, this.minimax(field, !isMax));
                            field[i][j] = 0;
                        }
                    }
                }
                return rankFalse;
            default:
                return 0;
        }
    }


    /**
     * Method findBestMove
     *
     * Return the best move for AI
     *
     * @return  Object  The best move for AI
     */
    findBestMove(): any {

        let bestVal = -1000;
        const bestMove = {
            row: -1,
            col: -1
        };

        return new Promise(resolve => {
            for (let i = 0; i < this.dimension; i++) {
                for (let j = 0; j < this.dimension; j++) {
                    if (this.currentField[i][j] === 0) {
                        this.currentField[i][j] = this.aiMarker;
                        const moveVal = this.minimax(this.currentField, false);
                        this.currentField[i][j] = 0;
                        if (moveVal > bestVal) {
                            bestMove.row = i;
                            bestMove.col = j;
                            bestVal = moveVal;
                        }
                    }
                    if (i === (this.dimension - 1) && j === (this.dimension - 1)) resolve(bestMove);
                }
            }
        });
    }
}