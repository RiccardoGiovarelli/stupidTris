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

import React from 'react';
import Square from './../square/Square';
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
                row0: {
                    square0: 0,
                    square1: 0,
                    square2: 0
                },
                row1: {
                    square0: 0,
                    square1: 1,
                    square2: 0
                },
                row2: {
                    square0: 0,
                    square1: 2,
                    square2: 0
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
                    <div className='field field__row field__row-1'>
                        <div className='field__column field__column-1'>
                            <Square
                                moveHandler={this.handleMove}
                                squareStatus={this.state.field.row0.square0}
                            />
                        </div>
                        <div className='field__column field__column-2'>
                            <Square
                                moveHandler={this.handleMove}
                                squareStatus={this.state.field.row0.square1}
                            />
                        </div>
                        <div className='field__column field__column-3'>
                            <Square
                                moveHandler={this.handleMove}
                                squareStatus={this.state.field.row0.square2}
                            />
                        </div>
                    </div>
                    <div className='field field__row field__row-2'>
                        <div className='field__column field__column-1'>
                            <Square
                                moveHandler={this.handleMove}
                                squareStatus={this.state.field.row1.square0}
                            />
                        </div>
                        <div className='field__column field__column-2'>
                            <Square
                                moveHandler={this.handleMove}
                                squareStatus={this.state.field.row1.square1}
                            />
                        </div>
                        <div className='field__column field__column-3'>
                            <Square
                                moveHandler={this.handleMove}
                                squareStatus={this.state.field.row1.square2}
                            />
                        </div>
                    </div>
                    <div className='field field__row field__row-3'>
                        <div className='field__column field__column-1'>
                            <Square
                                moveHandler={this.handleMove}
                                squareStatus={this.state.field.row2.square0}
                            />
                        </div>
                        <div className='field__column field__column-2'>
                            <Square
                                moveHandler={this.handleMove}
                                squareStatus={this.state.field.row2.square1}
                            />
                        </div>
                        <div className='field__column field__column-3'>
                            <Square
                                moveHandler={this.handleMove}
                                squareStatus={this.state.field.row2.square2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    handleMove(event: any, data: any): void {

    }
}
