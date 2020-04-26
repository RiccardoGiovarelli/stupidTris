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

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Title from './../title/Title';
import './Level.scss';

interface LevelState {
    levelSelected: number;
}

interface LevelProps {
    setLevel: any;
    levels: Array<any>
}

export default class Level extends React.Component<LevelProps, LevelState> {

    constructor(props: any) {
        super(props);

        // Init state
        this.state = {
            levelSelected: 0
        }

        // Methods binding
        this.handleClick = this.handleClick.bind(this);
    }


    // React render
    public render() {
        return <>
            <div className="level__container">
                <Title text="livello" />
                <div className="level__selector-container">
                    <div className="level__arrow-left">
                        <FontAwesomeIcon
                            id="left"
                            icon={faChevronLeft}
                            size="2x"
                            onClick={this.handleClick}
                            style={(this.state.levelSelected > 0) ? { cursor: "pointer" } : {}}
                        />
                    </div>
                    <div className="level__text-container">
                        {this.props.levels.map((level: any, index: number) => (
                            <div key={index} className={"level__text-label level__text-label" + (index === this.state.levelSelected ? '--visible' : '--hidden')}>
                                {level.label}
                            </div>
                        ))}
                    </div>
                    <div className="level__arrow-right">
                        <FontAwesomeIcon
                            id="right"
                            icon={faChevronRight}
                            size="2x"
                            onClick={this.handleClick}
                            style={(this.props.levels.length > this.state.levelSelected + 1) ? { cursor: "pointer" } : {}}
                        />
                    </div>
                </div>
            </div>
        </>
    }


    // Handle click to perform user action
    handleClick(event: any) {
        switch (event.currentTarget.id) {
            case 'left':
                if (this.state.levelSelected > 0) {
                    this.setState(prevState => ({
                        levelSelected: prevState.levelSelected - 1
                    }), () => { this.props.setLevel(this.state.levelSelected) });
                }
                break;
            case 'right':
                if (this.props.levels.length > this.state.levelSelected + 1) {
                    this.setState(prevState => ({
                        levelSelected: prevState.levelSelected + 1
                    }), () => { this.props.setLevel(this.state.levelSelected) });
                }
                break;
        }
    }
}
