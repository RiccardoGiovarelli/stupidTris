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
 * Random
 *
 * @author Riccardo Giovarelli
 * @copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>
 */
export default class Random {

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
     * @param   {Object}      currentField        Current Tic-tac-toe field
     * @param   {Function}    checkCurrentState   Function that return the field status
     * @param   {Number}      aiMarker            The AI id
     * @param   {Number}      playerMarker        The player id
     * @param   {Number}      evenMaker           Even result id
     * @param   {Number}      noresultsMaker      No result id
     * @param   {Number}      dimension           Field dimension
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
     * Method findBestMove
     *
     * Return the best move
     *
     * @return  {Object}  The best move
     */
    findBestMove(): Promise<any> {

        return new Promise(resolve => {

            const availableMove: Array<any> = this.getAvailableMove();
            const rejectedMoves: Array<any> = [];

            while (availableMove.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableMove.length);
                if (!this.isDangerous(availableMove[randomIndex])) {
                    resolve(availableMove[randomIndex]);
                    break;
                } else {
                    rejectedMoves.push(availableMove[randomIndex]);
                    availableMove.splice(randomIndex, 1);
                }
            }

            if (rejectedMoves.length > 0) { resolve(rejectedMoves[Math.floor(Math.random() * rejectedMoves.length)]) }
        });
    }


    /**
     * Method getRandomMove
     *
     * Return a random move
     *
     * @return  {Object}  A random move
     */
    getAvailableMove() {
        const freeSquare: any = [];
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                if (this.currentField[i][j] === 0) { freeSquare.push({ row: i, col: j }); }
                if (i === (this.dimension - 1) && j === (this.dimension - 1)) { return freeSquare; }
            }
        }
    }


    /**
     * Method isDangerous
     *
     * Check if move is dangerous
     * 
     * @param   {Object}   move  Move to test
     * @return  {Boolean}        True if a move is dangerous, false otherwise
     */
    isDangerous(move: any) {
        this.currentField[move.row][move.col] = this.aiMarker;
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                if (this.currentField[i][j] === 0) {
                    this.currentField[i][j] = this.playerMarker;
                    const status = this.checkCurrentState(
                        this.currentField,
                        this.playerMarker,
                        this.aiMarker,
                        this.evenMaker,
                        this.noresultsMaker,
                        'status'
                    );
                    this.currentField[i][j] = 0;
                    if (status === this.playerMarker) {
                        this.currentField[move.row][move.col] = 0;
                        return true;
                    }
                }
                if (i === (this.dimension - 1) && j === (this.dimension - 1)) {
                    this.currentField[move.row][move.col] = 0;
                    return false;
                }
            }
        }
    }
}