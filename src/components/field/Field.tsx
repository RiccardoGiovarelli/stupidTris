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
import Square from './../square/Square';
import { getNextMove } from './../../lib/api';
import './Field.scss';

interface FieldState {
    field: any;
}

interface FieldProps {
}

export default class Field extends React.Component<FieldProps, FieldState> {

    constructor(props: any) {
        super(props);

        this.state = {
            field: {
                0: {
                    0: 0,
                    1: 0,
                    2: 0
                },
                1: {
                    0: 0,
                    1: 0,
                    2: 0
                },
                2: {
                    0: 0,
                    1: 0,
                    2: 0
                }
            }
        }

        // Methods bind
        this.handleMove = this.handleMove.bind(this);
    }

    // React render
    public render() {
        return <>
            <div className="field field__container">
                <div className='field field__perimeter'>
                    {[0, 1, 2].map((rowNumber: number, rowIndex: number) => (
                        <div className={"field field__row field__row-" + rowNumber} key={rowIndex}>
                            {[0, 1, 2].map((columnNumber: number, columnIndex: number) => (
                                <div className={"field__column field__column-" + columnNumber} key={columnIndex}>
                                    <Square
                                        moveHandler={this.handleMove}
                                        squareStatus={this.state.field[rowNumber][columnNumber]}
                                        x={rowNumber}
                                        y={columnNumber}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    }

    // Handle the current move
    handleMove(event: any): void {
        const moveCoordinates = event.currentTarget.id.split("-");
        this.setState(prevState => {
            const fieldeCopy = { ...prevState.field };
            fieldeCopy[moveCoordinates[0]][moveCoordinates[1]] = 1;
            return {
                ...prevState,
                fieldeCopy
            }
        }, () => {
            this.callAiResponse();
        });
    }

    // Call AI service to get AI response
    async callAiResponse() {
        const data = await getNextMove(this.state.field);
        console.log("RESPONSE", data)
    }
}
