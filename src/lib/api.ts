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

import { checkCurrentState } from './game-lib';

/**
 * getNextMove
 *
 * Return the next move for AI by selected algorithm
 *
 * @param   {Object}  field           Field for the current Tic-tac-toe match
 * @param   {Number}  aiMarker        Maker number for AI
 * @param   {Number}  playerMarker    Maker number for Player
 * @param   {Number}  evenMaker       Maker number for even
 * @param   {Number}  noresultsMaker  Maker number for no result
 * @param   {Number}  algorithm       Algorithm to use
 * @return  {Object}     The best move for AI by coordinates
 */
export function getNextMove(
    field: any,
    aiMarker: number,
    playerMarker: number,
    evenMaker: number,
    noresultsMaker: number,
    dimension: number,
    levels: Array<any>,
    level: number
): Promise<any> {
    return new Promise(resolve => {
        const imported = import('../game/' + levels[level].id);
        imported.then((alg: any) => {
            let game = new alg.default(field, checkCurrentState, aiMarker, playerMarker, evenMaker, noresultsMaker, dimension);
            game.findBestMove().then((result: any) => { resolve(result); });
        });
    });
}