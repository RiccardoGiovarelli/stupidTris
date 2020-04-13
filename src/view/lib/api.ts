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



export function getNextMove(field: any): Promise<any> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: "request=nextMoveRequest&currentGrid=" + _getFieldString(field)
    };
    return fetch(
        "'../../src/controller/trisController.php?trisRequestId=" + window.btoa(JSON.stringify(requestOptions)),
        requestOptions
    );
}

function _getFieldString(field: any): string {
    return _flatArray(Object.keys(field).map((rowKey: string) =>
        Object.keys(field[rowKey]).map((columnKey: string) =>
            field[rowKey][columnKey]
        )
    )).join(",");
}

function _flatArray(array: Array<any>): Array<any> {
    return array.reduce((accumulator, value) =>
        accumulator.concat(value), []);
}