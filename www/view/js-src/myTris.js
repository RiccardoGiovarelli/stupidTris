import ScoreManager from './scoreManager';
import GameEngine from './gameEngine';
import StupidTris from './stupidTris';


/**
* Class MyTris
* Provides main tools for tris game management
*
* @author  Riccardo Giovarelli
*/
export default class MyTris extends StupidTris {
  /**
  * Method manageMove
  *
  * Manage the current move
  *
  * @param e Event to manage
  */
  manageMove(e) {
    if (this.stateOfMatch === 0) {
      return;
    }

    const matched = e.target.id.match(/td-(\d)-(\d)/);
    if (matched == null) return;

    this.makeMove(matched[1], matched[2], 'player');

    const currentResult = this.checkCurrentState();
    if (currentResult !== 6) {
      MyTris.manageResults(currentResult);
      return;
    }

    this.callAiResponse(this.field);
  }


  callAiResponse(currentField) {
    const responsePromise = new Promise((resolve) => {
      const xhttp = new XMLHttpRequest();
      let trisRequestId = new Date().getTime();
      trisRequestId += currentField;
      trisRequestId = window.btoa(currentField);

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
      };

      xhttp.open('POST', `../controller/trisController.php?trisRequestId=${trisRequestId}`, true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send(`request=nextMoveRequest&currentGrid=${currentField}`);
    });

    responsePromise.then((response) => {
      this.makeMove(response.row, response.col, 'ai');
      const currentResult = this.checkCurrentState();
      if (currentResult !== 6) {
        this.manageResults(currentResult);
      }
    });
  }


  /**
   * Method manageFooter
   *
   * Manage buttons click
   *
   * @param e Event to manage
   */
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


  /**
   * Method makeMove
   *
   * Make move (graphic)
   *
   * @param x Abscissa
   * @param y Ordinate
   * @param who Who make the move
   * @returns true on success, false on failure
   */
  makeMove(x, y, who) {
    switch (who) {
      case 'player':
        document.getElementById(`${x}-${y}`).insertAdjacentHTML('afterbegin', `<i class='${this.faX}'></i>`);
        this.field[x - 1][y - 1] = 1;
        return true;
      case 'ai':
        document.getElementById(`${+x + 1}-${+y + 1}`).insertAdjacentHTML('afterbegin', `<i class='${this.fa0}'></i>`);
        this.field[x][y] = 2;
        return true;
      default:
        return false;
    }
  }


  /**
   * Method manageResults
   *
   * Manage the current stat of match
   *
   * @param state Current stat of match
   */
  static manageResults(state) {
    const scoreManagerObj = new ScoreManager();
    switch (state) {
      case 3:
        MyTris.stateOfMatch = 0;
        document.getElementById('msg_box').innerHTML = 'Even!';
        break;
      case 5:
        MyTris.stateOfMatch = 0;
        scoreManagerObj.saveScore('player');
        document.getElementById('msg_box').innerHTML = 'You won!';
        break;
      case 10:
        MyTris.stateOfMatch = 0;
        scoreManagerObj.saveScore('ai');
        document.getElementById('msg_box').innerHTML = 'Stupid AI won!';
        break;
      default:
        break;
    }

    MyTris.paintResults();
  }


  /**
   * Method cleanField
   *
   * Clean field
   *
   * @param field Filed for the current Tris match
   */
  cleanField(field) {
    for (let x = 0; x < field.length; x += 1) {
      const line = field[x];
      for (let y = 0; y < line.length; y += 1) {
        document.getElementById(`${x + +1}-${y + +1}`).innerHTML = '';
        this.field[x][y] = 0;
      }
    }
  }


  /**
   * Method restartMatch
   *
   * Restart match
   */
  restartMatch() {
    MyTris.stateOfMatch = 1;
    this.cleanField(this.field);
    document.getElementById('msg_box').innerHTML = 'Play!';
  }


  /**
   * Method resetAI
   *
   * Restart Reset AI and match
   */
  resetAI() {
    const scoreManagerObj = new ScoreManager();
    scoreManagerObj.resetScore();
    MyTris.stateOfMatch = 1;
    this.cleanField(this.field);
    MyTris.paintResults();
    document.getElementById('msg_box').innerHTML = 'Play!';
  }


  /**
   * Method paintResults
   *
   * Paint current results
   */
  static paintResults() {
    const scoreManagerObj = new ScoreManager();
    const currentSituation = scoreManagerObj.readScore();
    document.getElementById('player_score_value').innerHTML = currentSituation.playerScore;
    document.getElementById('player_ia_value').innerHTML = currentSituation.aiScore;
    document.getElementById('match_value').innerHTML = currentSituation.round;
    if (currentSituation.round === 0) document.getElementById('match_value').style.visibility = 'hidden';
  }


  /**
   * Method checkCurrentState
   *
   * Check current field state
   *
   * @param field Filed for the current Tris match
   * @returns 3 if the match is even, 5 if player wins,
   * 10 if Ai win or 6 if there aren't results
   */
  checkCurrentState() {
    // Rows
    for (let i = 0; i < this.field.length; i += 1) {
      let playerHit = 0;
      let stupidAiHit = 0;
      const line = this.field[i];
      for (let j = 0; j < line.length; j += 1) {
        switch (line[j]) {
          case 1:
            playerHit += 1;
            break;
          case 2:
            stupidAiHit += 1;
            break;
          default:
            break;
        }
        if (playerHit === 3) return 5;
        if (stupidAiHit === 3) return 10;
      }
    }

    // Column
    for (let i = 0; i < this.field[0].length; i += 1) {
      let playerHit = 0;
      let stupidAiHit = 0;
      for (let j = 0; j < this.field.length; j += 1) {
        switch (this.field[j][i]) {
          case 1:
            playerHit += 1;
            break;
          case 2:
            stupidAiHit += 1;
            break;
          default:
            break;
        }
        if (playerHit === 3) return 5;
        if (stupidAiHit === 3) return 10;
      }
    }

    // Cross
    let playerHitLeft = 0;
    let playerHitRight = 0;
    let stupidAiHitLeft = 0;
    let stupidAiHitRight = 0;
    for (let i = 0; i < this.field.length; i += 1) {
      switch (this.field[i][i]) {
        case 1:
          playerHitLeft += 1;
          break;
        case 2:
          stupidAiHitLeft += 1;
          break;
        default:
          break;
      }
      switch (this.field[i][this.field.length - i - 1]) {
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
    if ((playerHitLeft === 3) || (playerHitRight === 3)) return 5;
    if ((stupidAiHitLeft === 3) || (stupidAiHitRight === 3)) return 10;

    // Even
    let countBox = 0;
    for (let i = 0; i < this.field.length; i += 1) {
      const line = this.field[i];
      for (let j = 0; j < line.length; j += 1) {
        if (line[j] !== 0) countBox += 1;
      }
    }
    if (countBox === 9) return 3;

    // No results
    return 6;
  }
}
