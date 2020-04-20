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
import './Panel.scss';

interface PanelState { }

interface PanelProps {
    panelAction: any;
    matchStatus: number;
    player: number;
    ai: number;
    even: number;
    noresults: number;
}

export default class Panel extends React.Component<PanelProps, PanelState> {

    constructor(props: any) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }


    // React render
    public render() {
        return <>
            <div className="panel__container">
                <div className="panel__title">
                    partita
                </div>
                <div className="panel__items">
                    <div className="panel__item">
                        <FontAwesomeIcon
                            id="1"
                            icon={faPlay}
                            size="2x"
                            onClick={this.handleClick}
                            className={"panel__icon panel__icon" + this.getIconClass(1)}
                        />
                    </div>
                    <div className="panel__item">
                        <FontAwesomeIcon
                            id="2"
                            icon={faStop}
                            size="2x"
                            onClick={this.handleClick}
                            className={"panel__icon panel__icon" + this.getIconClass(2)}
                        />
                    </div>
                </div>
            </div>
        </>
    }

    // Handle click to perform user action
    handleClick(event: any) {
        this.props.panelAction(parseInt(event.currentTarget.id));
    }

    // Return the icon class suffix
    getIconClass(itemId: number): string {
        switch (itemId) {
            case 1:
                if (this.props.matchStatus === this.props.noresults) {
                    return "--disabled";
                } else {
                    return "--enabled";
                }
            case 2:
                return "--enabled";
            default:
                return "--enabled";
        }
    }
}
