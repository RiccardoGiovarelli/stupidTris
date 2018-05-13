import ScoreManager from './scoreManager';
import GameEngine from './gameEngine';


export default class MyTris {
  constructor() {
    this.stateOfScoreTable = [];
    this.stateOfMatch = 1;
    this.faX = 'fas fa-times';
    this.fa0 = 'far fa-circle';
    this.field = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }


  // Manage the current move
  manageMove(e) {
    if (MyTris.stateOfMatch === 0) {
      return;
    }

    const matched = e.target.id.match(/td-(\d)-(\d)/);
    if (matched == null) return;

    this.makeMove(matched[1], matched[2], 'player');

    let currentResult = MyTris.checkCurrentState(this.field);
    if (currentResult !== 6) {
      MyTris.manageResults(currentResult);
      return;
    }

    const response = GameEngine.generateNextMove(this.field);
    this.makeMove(response[0], response[1], 'ia');

    currentResult = MyTris.checkCurrentState(this.field);
    if (currentResult !== 6) {
      MyTris.manageResults(currentResult);
    }
  }


  // Manage buttons click
  manageFooter(e) {
    switch (e.target.id) {
      case 'restart_button':
        this.restartMatch();
        return true;
      case 'reset_button':
        this.resetAI();
        return true;
      default:
        return false;
    }
  }


  // Make move (graphic)
  makeMove(x, y, who) {
    switch (who) {
      case 'player':
        $(`#${x}-${y}`).append(`<i class='${this.faX}'></i>`);
        this.field[x - 1][y - 1] = 1;
        return true;
      case 'ia':
        $(`#${+x + 1}-${+y + 1}`).append(`<i class='${this.fa0}'></i>`);
        this.field[x][y] = 2;
        return true;
      default:
        return false;
    }
  }


  // Manage final results
  static manageResults(state) {
    const scoreManagerObj = new ScoreManager();
    switch (state) {
      case 3:
        MyTris.stateOfMatch = 0;
        $('#msg_box').text('Even!');
        break;
      case 4:
        MyTris.stateOfMatch = 0;
        scoreManagerObj.saveScore('player');
        $('#msg_box').text('You won!');
        break;
      case 5:
        MyTris.stateOfMatch = 0;
        scoreManagerObj.saveScore('ai');
        $('#msg_box').text('Stupid IA won!');
        break;
      default:
        break;
    }

    MyTris.paintResults();
  }


  // Clean field
  cleanField(field) {
    for (let x = 0; x < field.length; x += 1) {
      const line = field[x];
      for (let y = 0; y < line.length; y += 1) {
        $(`#${x + +1}-${y + +1}`).empty();
        this.field[x][y] = 0;
      }
    }
  }


  // Restart match
  restartMatch() {
    MyTris.stateOfMatch = 1;
    this.cleanField(this.field);
    $('#msg_box').text('Play!');
  }


  // Reset IA and match
  resetAI() {
    const scoreManagerObj = new ScoreManager();
    scoreManagerObj.resetScore();
    MyTris.stateOfMatch = 1;
    this.cleanField(this.field);
    MyTris.paintResults();
    $('#msg_box').text('Play!');
  }


  // Paint current results
  static paintResults() {
    const scoreManagerObj = new ScoreManager();
    const currentSituation = scoreManagerObj.readScore();
    $('#player_score_value').text(currentSituation.playerScore);
    $('#player_ia_value').text(currentSituation.aiScore);
    $('#match_value').text(currentSituation.round);
    if (currentSituation.round === 0) $('#reset_button').css('visibility', 'hidden');
  }


  // Check current field state
  static checkCurrentState(field) {
    // Rows
    for (let i = 0; i < field.length; i += 1) {
      let playerHit = 0;
      let stupidIaHit = 0;
      const line = field[i];
      for (let j = 0; j < line.length; j += 1) {
        switch (line[j]) {
          case 1:
            playerHit += 1;
            break;
          case 2:
            stupidIaHit += 1;
            break;
          default:
            break;
        }
        if (playerHit === 3) return 4;
        if (stupidIaHit === 3) return 5;
      }
    }

    // Column
    for (let i = 0; i < field[0].length; i += 1) {
      let playerHit = 0;
      let stupidIaHit = 0;
      for (let j = 0; j < field.length; j += 1) {
        switch (field[j][i]) {
          case 1:
            playerHit += 1;
            break;
          case 2:
            stupidIaHit += 1;
            break;
          default:
            break;
        }
        if (playerHit === 3) return 4;
        if (stupidIaHit === 3) return 5;
      }
    }

    // Cross
    let playerHitLeft = 0;
    let playerHitRight = 0;
    let stupidAiHitLeft = 0;
    let stupidAiHitRight = 0;
    for (let i = 0; i < field.length; i += 1) {
      switch (field[i][i]) {
        case 1:
          playerHitLeft += 1;
          break;
        case 2:
          stupidAiHitLeft += 1;
          break;
        default:
          break;
      }
      switch (field[i][field.length - i - 1]) {
        case 1:
          playerHitRight += 1;
          break;
        case 2:
          stupidAiHitRight += 1;
          break;
        default:
          break;
      }
    }
    if ((playerHitLeft === 3) || (playerHitRight === 3)) return 4;
    if ((stupidAiHitLeft === 3) || (stupidAiHitRight === 3)) return 5;

    // Even
    let countBox = 0;
    for (let i = 0; i < field.length; i += 1) {
      const line = field[i];
      for (let j = 0; j < line.length; j += 1) {
        if (line[j] !== 0) countBox += 1;
      }
    }
    if (countBox === 9) return 3;

    // No results
    return 6;
  }
}
