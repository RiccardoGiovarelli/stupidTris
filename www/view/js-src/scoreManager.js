import * as TrisLib from './trisLib';

/**
* Class ScoreManager
* Provides tools for the management of the score
*
* @author  Riccardo Giovarelli
*/
export default class ScoreManager {
  constructor() {
    this.roundCookieName = 'current-round';
    this.aiCookieName = 'current-AI-score';
    this.playerCookieName = 'current-PLAYER-score';
  }


  /**
  * Method saveScore
  *
  * Update the score on cookie
  *
  * @param who Who gained the point
  */
  saveScore(who) {
    const currentSituation = this.readScore();
    const currentRound = +currentSituation.round + +1;
    const currentAiScore = +currentSituation.aiScore + +1;
    const currentPlayScore = +currentSituation.playerScore + +1;

    switch (who) {
      case 'ai':
        document.cookie = `${this.roundCookieName}=${currentRound}`;
        document.cookie = `${this.aiCookieName}=${currentAiScore}`;
        break;
      case 'player':
        document.cookie = `${this.roundCookieName}=${currentRound}`;
        document.cookie = `${this.playerCookieName}=${currentPlayScore}`;
        break;
      default:
        break;
    }
  }


  /**
   * Method resetScore
   *
   * Reset score table
   */
  resetScore() {
    document.cookie = `${this.roundCookieName}=0`;
    document.cookie = `${this.playerCookieName}=0`;
    document.cookie = `${this.aiCookieName}=0`;
  }


  /**
   * Method readScore
   *
   * Read score table
   */
  readScore() {
    const toReturn = {};

    toReturn.round = TrisLib.getCookie(this.roundCookieName);
    toReturn.aiScore = TrisLib.getCookie(this.aiCookieName);
    toReturn.playerScore = TrisLib.getCookie(this.playerCookieName);

    toReturn.round = ((toReturn.round === undefined) || (toReturn.round === 'NaN')) ? 0 : toReturn.round;
    toReturn.aiScore = ((toReturn.aiScore === undefined) || (toReturn.aiScore === 'NaN')) ? 0 : toReturn.aiScore;
    toReturn.playerScore = ((toReturn.playerScore === undefined) || (toReturn.playerScore === 'NaN')) ? 0 : toReturn.playerScore;

    return toReturn;
  }
}
