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
import Field from './components/field/Field';
import Scoreboard from './components/scoreboard/Scoreboard';
import Panel from './components/panel/Panel';
import Level from './components/level/Level';
import './App.scss';

interface AppState {
  score: any;
  currentAction: number;
  currentStatus: number;
  currentLevel: number;
}

interface AppProps { }

export default class App extends React.Component<AppProps, AppState> {

  constructor(props: any) {
    super(props);

    // Init State
    this.state = {
      score: {
        cross: 0,
        circle: 0
      },
      currentAction: 0,
      currentStatus: 0,
      currentLevel: 0
    }

    // Methods binding
    this.setScore = this.setScore.bind(this);
    this.resetScore = this.resetScore.bind(this);
    this.setAction = this.setAction.bind(this);
    this.setMatchStatus = this.setMatchStatus.bind(this);
    this.setLevel = this.setLevel.bind(this);
  }

  player: number = 5;
  ai: number = 10;
  even: number = 3;
  noresults: number = 6;
  playerAlias: string = "player";
  aiAlias: string = "ai";
  dimension: number = 3;
  levels: Array<any> = [
    { label: 'Beginner', id: 'stupid' },
    { label: 'Intermediate', id: 'random' },
    { label: 'Expert', id: 'minimax' }
  ];


  // React render
  public render() {
    return <>
      <div className="app__container">
        <div className="app__game-area">
          <Field
            setScore={this.setScore}
            resetScore={this.resetScore}
            player={this.player}
            ai={this.ai}
            playerAlias={this.playerAlias}
            aiAlias={this.aiAlias}
            even={this.even}
            noresults={this.noresults}
            currentAction={this.state.currentAction}
            panelAction={this.setAction}
            setMatchStatus={this.setMatchStatus}
            dimension={this.dimension}
            level={this.state.currentLevel}
            levels={this.levels}
          />
        </div>
        <div className="app__tool-area">
          <Scoreboard
            scoreCross={this.state.score.cross}
            scoreCircle={this.state.score.circle}
          />
          <Panel
            panelAction={this.setAction}
            matchStatus={this.state.currentStatus}
            even={this.even}
            noresults={this.noresults}
          />
          <Level
            setLevel={this.setLevel}
            levels={this.levels}
          />
        </div>
      </div>
    </>
  }


  // Update the score
  setScore(matchStatus: number) {
    this.setState(prevState => {
      const score = Object.assign({}, prevState.score);
      if (matchStatus === this.ai) {
        score.cross = score.cross + 1;
      } else if (matchStatus === this.player) {
        score.circle = score.circle + 1;
      }
      return { score };
    })
  }


  // Reset the score
  resetScore() {
    this.setState({ score: { cross: 0, circle: 0 } })
  }


  // Set the current action
  setAction(currentAction: number) {
    this.setState({ currentAction });
  }


  // Set the match status on parent component
  setMatchStatus(currentStatus: number) {
    this.setState({ currentStatus });
  }


  // Set difficult level for the game
  setLevel(currentLevel: number) {
    this.setState({ currentLevel });
  }
}