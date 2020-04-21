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
import { faTimes, faLaptop, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import Title from './../title/Title';
import './Scoreboard.scss';

interface ScoreboardState { }

interface ScoreboardProps {
    score: any;
}

export default class Scoreboard extends React.Component<ScoreboardProps, ScoreboardState> {

    // React render
    public render() {
        return (
            <div className="scoreboard__container">
                <Title text="punteggio" />
                <div className="scoreboard__cross-score">
                    <div className="scoreboard__symbol">
                        <FontAwesomeIcon icon={faTimes} size="sm" />
                    </div>
                    <div className="scoreboard__colon">
                        :
                    </div>
                    <div className="scoreboard__score">
                        {this.props.score.cross}
                    </div>
                    <div className="scoreboard__icon">
                        <FontAwesomeIcon icon={faLaptop} size="sm" />
                    </div>
                </div>
                <div className="scoreboard__circle-score">
                    <div className="scoreboard__symbol">
                        <FontAwesomeIcon icon={faCircle} size="sm" />
                    </div>
                    <div className="scoreboard__colon">
                        :
                    </div>
                    <div className="scoreboard__score">
                        {this.props.score.circle}
                    </div>
                    <div className="scoreboard__icon">
                        <FontAwesomeIcon icon={faUser} size="sm" />
                    </div>
                </div>
            </div>
        )
    }
}
