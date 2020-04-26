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

import * as React from 'react'
import './Square.scss';

export default function Square(props: any) {

    return (
        <div
            id={props.x + "-" + props.y}
            className="square__container"
            onClick={props.squareStatus === 0 && props.enabled ? props.moveHandler : undefined}
        >
            <div className={"square__content square__content" + getContentClass(props)}></div>
        </div>
    );
}


// Return classes for this square
function getContentClass(props: any) {

    let test = 0;
    let decorate = false;

    if (props.squareStatus >= 100) {
        test = props.squareStatus - 100;
        decorate = true;
    } else {
        test = props.squareStatus;
    }

    switch (test) {
        case 0:
            return "--empty" + (props.enabled ? " square__clickable" : " square__full");
        case props.ai:
            return "--circle square__full" + (decorate ? " square__decorate" : "");
        case props.player:
            return "--cross square__full" + (decorate ? " square__decorate" : "");
        default:
            return "--error square__full";
    }
}
