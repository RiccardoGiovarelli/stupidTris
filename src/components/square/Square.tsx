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

interface SquareState { }

interface SquareProps {
    moveHandler: any;
    squareStatus: Number;
    x: Number;
    y: Number;
}

export default class Square extends React.Component<SquareProps, SquareState> {

    // React render
    public render() {
        return <>
            <div
                id={this.props.x + "-" + this.props.y}
                className={"square square__container square__container" + this.getContentClass()}
                onClick={this.props.moveHandler}
            >
                <div className={"square square__content square__content-animation square__content" + this.getContentClass()}>
                </div>
            </div>
        </>
    }

    getContentClass(): string {
        switch (this.props.squareStatus) {
            case 0:
                return "--empty";
            case 1:
                return "--circle";
            case 2:
                return "--cross";
            default:
                return "--error";
        }
    }
}
