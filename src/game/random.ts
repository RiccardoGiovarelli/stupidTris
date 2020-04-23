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
     * Method findBestMove
     *
     * Return the best move for AI
     *
     * @return  Object  The best move for AI
     */
    findBestMove(): any {
        return new Promise(resolve => {
            const availableMove: any = this.getAvailableMove();
            Object.keys(availableMove).forEach((key: string) => {
                const randomIndex = Math.floor(Math.random() * availableMove.length);
                const currentMove = availableMove[randomIndex];
                this.currentField[currentMove.row][currentMove.col] = this.aiMarker;
                const status = this.hazardSearch(this.currentField);
                this.currentField[currentMove.row][currentMove.col] = 0;
                if (!status) {
                    resolve(currentMove);
                } else {
                    availableMove.splice(randomIndex, 1);
                }
            });
        });
    }



    /**
     * Method getRandomMove
     *
     * Return a random move
     *
     * @return  Object  A random move
     */
    getAvailableMove() {
        const freeSquare: any = [];
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                if (this.currentField[i][j] === 0) {
                    freeSquare.push({ row: i, col: j });
                }
            }
        }
        return freeSquare;
    }

    hazardSearch(field: any) {
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                if (field[i][j] === 0) {
                    field[i][j] = this.playerMarker;
                    if (
                        this.checkCurrentState(
                            field,
                            this.playerMarker,
                            this.aiMarker,
                            this.evenMaker,
                            this.noresultsMaker,
                            'status'
                        ) === this.playerMarker
                    ) { return true; }
                    field[i][j] = 0;
                }
            }
        }
        return false;
    }
}