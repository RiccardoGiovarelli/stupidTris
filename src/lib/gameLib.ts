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
 * checkCurrentState
 *
 * Check current field state
 *
 * @param   Object  field           Field for the current Tic-tac-toe match
 * @param   Number  playerMarker    Identifier number for palyer
 * @param   Number  aiMarker        Identifier number for AI
 * @return  Number  3 if the match is even, 5 if player wins, 
 *                   10 if Ai win or 6 if there aren't results
 */

export function checkCurrentState(field: any, playerMarker: number, aiMarker: number): number {

    const hitMatrix = {
        player: {
            row: 0,
            column: 0,
            cross: { right: 0, left: 0 }
        },
        stupidAi: {
            row: 0,
            column: 0,
            cross: { right: 0, left: 0 }
        },
        boxes: 0
    };


    // LOOP LEVEL 1
    for (let i = 0; i < 3; i++) {


        // Rows count reset
        hitMatrix.player.row = 0;
        hitMatrix.stupidAi.row = 0;

        // Column count reset
        hitMatrix.player.column = 0;
        hitMatrix.stupidAi.column = 0;


        //Cross win check
        switch (field[i][i]) {
            case playerMarker:
                hitMatrix.player.cross.left++;
                break;
            case aiMarker:
                hitMatrix.stupidAi.cross.left++;
                break;
        }
        switch (field[i][2 - i]) {
            case playerMarker:
                hitMatrix.player.cross.right++;
                break;
            case aiMarker:
                hitMatrix.stupidAi.cross.right++;
                break;
        }
        if ((hitMatrix.player.cross.left === 3) || (hitMatrix.player.cross.right === 3)) return 5;
        if ((hitMatrix.stupidAi.cross.left === 3) || (hitMatrix.stupidAi.cross.right === 3)) return 10;


        // LOOP LEVEL 2
        for (let j = 0; j < 3; j++) {


            // Rows win check
            switch (field[i][j]) {
                case playerMarker:
                    hitMatrix.player.row++;
                    break;
                case aiMarker:
                    hitMatrix.stupidAi.row++;
                    break;
            }
            if (hitMatrix.player.row === 3) return 5;
            if (hitMatrix.stupidAi.row === 3) return 10;


            // Columns win check
            switch (field[j][i]) {
                case playerMarker:
                    hitMatrix.player.column++;
                    break;
                case aiMarker:
                    hitMatrix.stupidAi.column++;
                    break;
            }
            if (hitMatrix.player.column === 3) return 5;
            if (hitMatrix.stupidAi.column === 3) return 10;


            // Count boxes
            if (field[i][j] !== 0) hitMatrix.boxes++;
        }
    }


    // Even result check
    if (hitMatrix.boxes === 9) return 3;


    // No results
    return 6;
}