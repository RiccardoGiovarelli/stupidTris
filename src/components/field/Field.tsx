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
import { checkCurrentState } from '../../lib/game-lib';
import './Field.scss';

interface FieldState {
    field: any;
    matchStatus: number;
    playerTurn: boolean;
    enabled: boolean;
}

interface FieldProps {
    setScore: any;
    resetScore: any;
    player: number;
    ai: number;
    playerAlias: string;
    aiAlias: string;
    even: number;
    noresults: number;
    currentAction: number;
    panelAction: any;
    setMatchStatus: any;
    dimension: number;
    level: number;
    levels: Array<any>;
}

export default class Field extends React.Component<FieldProps, FieldState> {

    constructor(props: any) {

        super(props);

        // Init state
        this.state = {
            field: this.buildEmptyField(this.props.dimension),
            matchStatus: props.noresults,
            playerTurn: true,
            enabled: true
        }

        // Methods binding
        this.handleMove = this.handleMove.bind(this);
    }


    // React componentDidMount
    componentDidMount(): void {
        this.props.setMatchStatus(this.props.noresults);
    }


    // React componentDidUpdate
    componentDidUpdate(prevProps: any, prevState: any): void {

        if (prevState.matchStatus !== this.state.matchStatus && (this.state.matchStatus === this.props.player || this.state.matchStatus === this.props.ai)) {
            this.setState({ enabled: false }, () => {
                this.decorateField(1000);
                this.props.setScore(this.state.matchStatus);
            });
        }

        if (prevProps.currentAction !== this.props.currentAction) {
            this.manageAction(this.props.currentAction);
        }
    }


    // React render
    public render(): Object {

        return <>
            <div className="field__container">
                <div className='field__perimeter'>
                    {Array.from(Array(this.props.dimension)).map((_, rowIndex: number) => (
                        <div className={"field__row field__row-" + rowIndex} key={rowIndex}>
                            {Array.from(Array(this.props.dimension)).map((_, columnIndex: number) => (
                                <div className={"field__column field__column-" + columnIndex} key={columnIndex}>
                                    <Square
                                        moveHandler={this.handleMove}
                                        squareStatus={this.state.field[rowIndex][columnIndex]}
                                        x={rowIndex}
                                        y={columnIndex}
                                        enabled={this.state.enabled}
                                        player={this.props.player}
                                        ai={this.props.ai}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    }


    // Build an empty field by
    buildEmptyField(dimension: number): any {

        const field: any = {};

        for (let i = 0; i < dimension; i++) {
            const row: any = {};
            field[i] = row;
            for (let j = 0; j < dimension; j++) {
                field[i][j] = 0;
            }
        }

        return field;
    }


    // Handle the current user move
    handleMove(event: any): void {

        const { currentTarget } = event;

        this.setState({ enabled: false }, () => {
            const moveCoordinates = currentTarget.id.split("-");
            this.makeMove(parseInt(moveCoordinates[0]), parseInt(moveCoordinates[1]), 'player');
        });
    }


    // Call AI service to get AI response
    callAiResponse(): void {

        this.setState({ enabled: false }, async () => {
            const move = await getNextMove(
                this.state.field,
                this.props.ai,
                this.props.player,
                this.props.even,
                this.props.noresults,
                this.props.dimension,
                this.props.levels,
                this.props.level
            );
            this.makeMove(move.row, move.col, 'ai');
        });
    }


    // Make player ora AI move
    makeMove(x: number, y: number, who: string): void {

        this.setState(prevState => {
            const field = Object.assign({}, prevState.field);
            field[x][y] = who === 'player' ? this.props.player : this.props.ai;
            return { field };
        }, () => {
            const currentMatchStatus = checkCurrentState(
                this.state.field,
                this.props.ai,
                this.props.player,
                this.props.even,
                this.props.noresults,
                'status'
            );
            if (currentMatchStatus !== this.props.noresults) {
                this.setState({
                    matchStatus: currentMatchStatus,
                    enabled: true
                });
                this.props.setMatchStatus(currentMatchStatus);
            } else if (who === this.props.playerAlias) {
                setTimeout(() => { this.callAiResponse(); }, 500);
            } else if (who === this.props.aiAlias) {
                this.setState({ enabled: true });
            }
        });
    }


    // Empty the game field
    resetField(): Promise<any> {

        return new Promise((resolve: any) => {
            this.setState(prevState => {
                const field = Object.assign({}, prevState.field);
                Array.from(Array(this.props.dimension)).forEach((_, rowNumber: number) => {
                    Array.from(Array(this.props.dimension)).forEach((_, columnNumber: number) => {
                        field[rowNumber][columnNumber] = 0;
                    });
                });
                return { field, enabled: true };
            }, () => { resolve(true); });
        });
    }


    // Switch turn and perform related operations
    switchTurn(): void {

        this.setState(prevState => ({
            playerTurn: !prevState.playerTurn,
            matchStatus: this.props.noresults
        }), async () => {
            this.props.setMatchStatus(this.props.noresults);
            await this.resetField();
            if (!this.state.playerTurn) { this.callAiResponse() }
        });
    }


    // Highlight the winner line
    decorateField(delay: number): void {

        const winningCode = checkCurrentState(
            this.state.field,
            this.props.player,
            this.props.ai,
            this.props.even,
            this.props.noresults,
            'where'
        );

        // Diagonal 1
        if (winningCode === 11) {
            setTimeout(() => {
                this.setState(prevState => {
                    const field = Object.assign({}, prevState.field);
                    Array.from(Array(this.props.dimension)).forEach((_, cursor: number) => {
                        field[cursor][cursor] = this.state.matchStatus + 100;
                    });
                    return { field };
                });
            }, delay);
        }
        // Diagonal 2
        else if (winningCode === 12) {
            setTimeout(() => {
                this.setState(prevState => {
                    const field = Object.assign({}, prevState.field);
                    Array.from(Array(this.props.dimension)).forEach((_, cursor: number) => {
                        field[cursor][2 - cursor] = this.state.matchStatus + 100;
                    });
                    return { field };
                });
            }, delay);
        }
        // Row
        else if (winningCode >= 20 && winningCode < 30) {
            setTimeout(() => {
                this.setState(prevState => {
                    const field = Object.assign({}, prevState.field);
                    Array.from(Array(this.props.dimension)).forEach((_, columnNumber: number) => {
                        field[winningCode - 20][columnNumber] = this.state.matchStatus + 100;
                    });
                    return { field };
                });
            }, delay);
        }
        // Column
        else if (winningCode >= 30 && winningCode < 40) {
            setTimeout(() => {
                this.setState(prevState => {
                    const field = Object.assign({}, prevState.field);
                    Array.from(Array(this.props.dimension)).forEach((_, rowNumber: number) => {
                        field[rowNumber][winningCode - 30] = this.state.matchStatus + 100;
                    });
                    return { field };
                });
            }, delay);
        }
    }


    // Perform action required from panel
    manageAction(currentAction: number) {

        switch (currentAction) {
            case 1:
                this.props.panelAction(0);
                this.switchTurn();
                break;
            case 2:
                this.props.panelAction(0);
                this.switchTurn();
                this.props.resetScore();
                break;
        }
    }
}