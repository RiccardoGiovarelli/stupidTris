import * as React from 'react'
import Square from './../square/Square';
import { getNextMove } from './../../lib/api';
import { checkCurrentState } from './../../lib/gameLib';
import './Field.scss';

interface FieldState {
    field: any;
    matchStatus: number;
    playerTurn: boolean;
}

interface FieldProps {
    setScore: any;
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
            playerTurn: true
        }

        // Methods bind
        this.handleMove = this.handleMove.bind(this);
    }

    // React componentDidUpdate
    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.matchStatus !== this.state.matchStatus) {
            this.switchTurn();
            this.props.setScore(this.state.matchStatus);
        }
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
        this.makeMove(moveCoordinates[0], moveCoordinates[1], 'player');
    }

    // Call AI service to get AI response
    async callAiResponse() {
        const move = await getNextMove(this.state.field);
        this.makeMove(move.row, move.col, 'ai');
    }

    // Make player ora AI move
    makeMove(x: number, y: number, who: string): void {
        this.setState(prevState => {
            const field = Object.assign({}, prevState.field);
            field[x][y] = who === 'player' ? 1 : 2;
            return { field };
        }, () => {
            const currentMatchStatus = checkCurrentState(this.state.field, 1, 2);
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
            if (this.state.playerTurn) { this.callAiResponse() }
        });
    }
}