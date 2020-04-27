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
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import Title from './../title/Title';
import './Panel.scss';

export default function Panel(props: any) {

    return (
        <div className="panel__container">
            <Title text="Game control" />
            <div className="panel__items">
                <div className="panel__item">
                    <FontAwesomeIcon
                        id="1"
                        icon={faPlay}
                        size="2x"
                        onClick={(event) => { handleClick(event, props) }}
                        className={"panel__icon panel__icon" + getIconClass(1, props)}
                    />
                </div>
                <div className="panel__item">
                    <FontAwesomeIcon
                        id="2"
                        icon={faStop}
                        size="2x"
                        onClick={(event) => { handleClick(event, props) }}
                        className={"panel__icon panel__icon" + getIconClass(2, props)}
                    />
                </div>
            </div>
        </div>
    )
}


// Handle click to perform user action
function handleClick(event: React.MouseEvent, props: any) {
    if (props.matchStatus !== props.noresults) {
        props.panelAction(parseInt(event.currentTarget.id));
    }
}


// Return the icon class suffix
function getIconClass(itemId: number, props: any): string {
    switch (itemId) {
        case 1:
            return (props.matchStatus === props.noresults) ? "--disabled" : "--enabled"
        case 2:
            return "--enabled";
        default:
            return "--enabled";
    }
}
