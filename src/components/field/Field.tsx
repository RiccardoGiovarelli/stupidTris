import * as React from 'react'
import Square from './../square/Square';
import { getNextMove } from './../../lib/api';
import { checkCurrentState } from './../../lib/gameLib';
import './Field.scss';

interface FieldState {
    field: any;
    matchStatus: number;
    playerTurn: boolean;
    enabled: boolean;
}

interface FieldProps {
    setScore: any;
    player: number;
    ai: number;
}

export default class Field extends React.Component<FieldProps, FieldState> {

    constructor(props: any) {
        super(props);

        this.state = {
            field: {
                0: { 0: 0, 1: 0, 2: 0 },
                1: { 0: 0, 1: 0, 2: 0 },
                2: { 0: 0, 1: 0, 2: 0 }
            },
            matchStatus: 6,
            playerTurn: true,
            enabled: true
        }

        // Methods bind
        this.handleMove = this.handleMove.bind(this);
    }

    // React componentDidUpdate
    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.matchStatus !== this.state.matchStatus && (this.state.matchStatus === 5 || this.state.matchStatus === 10)) {
            this.setState({ enabled: false }, () => {
                this.decorateField(1000);
                this.props.setScore(this.state.matchStatus);
            });
        } else if (prevState.matchStatus !== this.state.matchStatus && this.state.matchStatus !== 6) {
            //this.switchTurn();
        }
    }

    // React render
    public render() {
        return <>
            <div className="field__container">
                <div className='field__perimeter'>
                    {[0, 1, 2].map((rowNumber: number, rowIndex: number) => (
                        <div className={"field__row field__row-" + rowNumber} key={rowIndex}>
                            {[0, 1, 2].map((columnNumber: number, columnIndex: number) => (
                                <div className={"field__column field__column-" + columnNumber} key={columnIndex}>
                                    <Square
                                        moveHandler={this.handleMove}
                                        squareStatus={this.state.field[rowNumber][columnNumber]}
                                        x={rowNumber}
                                        y={columnNumber}
                                        enabled={this.state.enabled}
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
        this.makeMove(moveCoordinates[0], moveCoordinates[1], 'player');
    }

    // Call AI service to get AI response
    async callAiResponse() {
        const move = await getNextMove(this.state.field, this.props.ai, this.props.player);
        this.makeMove(move.row, move.col, 'ai');
    }

    // Make player ora AI move
    makeMove(x: number, y: number, who: string): void {
        this.setState(prevState => {
            const field = Object.assign({}, prevState.field);
            field[x][y] = who === 'player' ? this.props.player : this.props.ai;
            return { field };
        }, () => {
            const currentMatchStatus = checkCurrentState(this.state.field, this.props.player, this.props.ai, 'status');
            if (currentMatchStatus !== 6) {
                this.setState({ matchStatus: currentMatchStatus });
            } else if (who === 'player') {
                setTimeout(() => { this.callAiResponse(); }, 500);
            }
        });
    }

    // Empty the Tic-Tac-Toe field
    emptyField() {
        return new Promise((resolve: any) => {
            this.setState(prevState => {
                const field = Object.assign({}, prevState.field);
                [0, 1, 2].forEach((rowNumber: number) => {
                    [0, 1, 2].forEach((columnNumber: number) => {
                        field[rowNumber][columnNumber] = 0;
                    });
                });
                return { field };
            }, () => {
                resolve(true);
            });
        });
    }

    // Switch turn and perform related operations
    switchTurn() {
        this.setState(prevState => ({
            playerTurn: !prevState.playerTurn,
            matchStatus: 6
        }), async () => {
            await this.emptyField();
            if (!this.state.playerTurn) { this.callAiResponse() }
        });
    }

    // Highlight the winner line
    decorateField(delay: number) {
        const winningCode = checkCurrentState(this.state.field, this.props.player, this.props.ai, 'where');
        // Diagonal 1
        if (winningCode === 11) {
            setTimeout(() => {
                this.setState(prevState => {
                    const field = Object.assign({}, prevState.field);
                    [0, 1, 2].forEach((cursor: number) => {
                        field[cursor][cursor] = this.state.matchStatus + 100;
                    });
                    return { field };
                });
            }, delay);
            // Diagonal 2
        } else if (winningCode === 12) {
            setTimeout(() => {
                this.setState(prevState => {
                    const field = Object.assign({}, prevState.field);
                    [0, 1, 2].forEach((cursor: number) => {
                        field[cursor][2 - cursor] = this.state.matchStatus + 100;
                    });
                    return { field };
                });
            }, delay);
            // Row
        } else if (winningCode >= 20 && winningCode < 30) {
            setTimeout(() => {
                this.setState(prevState => {
                    const field = Object.assign({}, prevState.field);
                    [0, 1, 2].forEach((columnNumber: number) => {
                        field[winningCode - 20][columnNumber] = this.state.matchStatus + 100;
                    });
                    return { field };
                });
            }, delay);
            // Column
        } else if (winningCode >= 30 && winningCode < 40) {
            setTimeout(() => {
                this.setState(prevState => {
                    const field = Object.assign({}, prevState.field);
                    [0, 1, 2].forEach((rowNumber: number) => {
                        field[rowNumber][winningCode - 30] = this.state.matchStatus + 100;
                    });
                    return { field };
                });
            }, delay);
        }
    }
}