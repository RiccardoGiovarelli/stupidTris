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
 * @param   number  playerMarker    Identifier number for palyer
 * @param   number  aiMarker        Identifier number for AI
 * @param   string  output          Type of output
 * @return  Number  Field current state
 * 
 * RETURN DETAILS:
 * output = "status" => 1 for EVEN, 5 for PLAYER WIN, 10 for AI WIN and 6 for no results
 * output = "where"  => three digit number: First = Player/IA, Second = Kind of win, Third = diagonal/row/column
 */

export function checkCurrentState(field: any, playerMarker: number, aiMarker: number, output: "status" | "where"): number {

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
    const playerWin = 5;
    const AIWin = 10;
    const even = 3;
    const noResults = 6;


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
        if (hitMatrix.player.cross.right === 3) {
            if (output === 'status') return playerWin;
            if (output === 'where') return 11;
        }
        if (hitMatrix.player.cross.left === 3) {
            if (output === 'status') return playerWin;
            if (output === 'where') return 12;
        }
        if (hitMatrix.stupidAi.cross.left === 3) {
            if (output === 'status') return AIWin;
            if (output === 'where') return 11;
        }
        if (hitMatrix.stupidAi.cross.right === 3) {
            if (output === 'status') return AIWin;
            if (output === 'where') return 12;
        }


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
            if (hitMatrix.player.row === 3) {
                if (output === 'status') return playerWin;
                if (output === 'where') return 20 + i;
            }
            if (hitMatrix.stupidAi.row === 3) {
                if (output === 'status') return AIWin;
                if (output === 'where') return 20 + i;
            }


            // Columns win check
            switch (field[j][i]) {
                case playerMarker:
                    hitMatrix.player.column++;
                    break;
                case aiMarker:
                    hitMatrix.stupidAi.column++;
                    break;
            }
            if (hitMatrix.player.column === 3) {
                if (output === 'status') return playerWin;
                if (output === 'where') return 30 + i;
            }
            if (hitMatrix.stupidAi.column === 3) {
                if (output === 'status') return AIWin;
                if (output === 'where') return 30 + i;
            }

            // Count boxes
            if (field[i][j] !== 0) hitMatrix.boxes++;
        }
    }


    // Even result check
    if (hitMatrix.boxes === 9) return even;


    // No results
    return noResults;
}