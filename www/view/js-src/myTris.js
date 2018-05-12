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
    if (this.stateOfMatch === 0) return;

    // Get clicked square id
    const matched = e.target.id.match(/td-(\d)-(\d)/);
    if (matched == null) return;

    // Make current move for player
    this.makeMove(matched[1], matched[2], 'player');

    // Check if match ended
    let currentResult = MyTris.checkCurrentState(this.field);

    if (currentResult !== 6) {
      MyTris.manageResults(currentResult);
      return;
    }

    // Get next move
    const response = GameEngine.generateNextMove(this.field);

    // Make move
    this.makeMove(response[0], response[1], 'ia');

    // Check if match ended
    currentResult = MyTris.checkCurrentState(this.field);

    if (currentResult !== 6) {
      MyTris.manageResults(currentResult);
    }
  }

  // Manage buttons click
  static manageFooter(e) {
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
    switch (state) {
      case 3:
        this.stateOfMatch = 0;
        $('#msg_box').text('Even!');
        break;
      case 4:
        ScoreManager.saveScore('player');
        this.stateOfMatch = 0;
        $('#msg_box').text('You won!');
        break;
      case 5:
        ScoreManager.saveScore('ai');
        this.stateOfMatch = 0;
        $('#msg_box').text('Stupid IA won!');
        break;
      default:
        break;
    }

    // Read current score ad set results
    const currentSituation = ScoreManager.readScore();
    $('#player_score_value').text(currentSituation.currentPlayerScore);
    $('#player_ia_value').text(currentSituation.currentAiScore);
    $('#match_value').text(currentSituation.currentRound);
  }


  // Clean field
  static cleanField(field) {
    for (let x = 0; x < field.length; x += 1) {
      const line = field[x];
      for (let y = 0; y < line.length; y += 1) {
        $(`#${x + +1}-${y + +1}`).empty();
        this.field[x][y] = 0;
      }
    }
  }


  // Restart match
  static restartMatch() {
    this.stateOfMatch = 1;
    this.cleanField(this.field);
    $('#msg_box').text('Play!');
  }


  // Reset IA and match
  static resetAI() {
    ScoreManager.resetScore();
    this.stateOfMatch = 1;
    this.cleanField(this.field);
    $.cookie(ScoreManager.ai_cookie_name, 0);
    $.cookie(ScoreManager.player_cookie_name, 0);
    $('#player_score_value').text('0');
    $('#player_ia_value').text('0');
    $('#msg_box').text('Play!');
    $('#match_value').text('1');
  }


  // Check current field state
  static checkCurrentState(field) {
    // Check for winner in rows
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

    // Check for winner in column
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

    // Check for winneer in cross
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

    // Check for even match
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
