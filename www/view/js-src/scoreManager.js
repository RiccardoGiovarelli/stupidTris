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

    switch (who) {
      case 'ai':
        $.cookie(this.roundCookieName, +currentSituation.round + +1);
        $.cookie(this.aiCookieName, +currentSituation.aiScore + +1);
        break;
      case 'player':
        $.cookie(this.roundCookieName, +currentSituation.round + +1);
        $.cookie(this.playerCookieName, +currentSituation.playerScore + +1);
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
    $.cookie(this.roundCookieName, 0);
    $.cookie(this.playerCookieName, 0);
    $.cookie(this.aiCookieName, 0);
  }


  /**
   * Method readScore
   *
   * Read score table
   */
  readScore() {
    const toReturn = {};

    toReturn.round = $.cookie(this.roundCookieName);
    toReturn.aiScore = $.cookie(this.aiCookieName);
    toReturn.playerScore = $.cookie(this.playerCookieName);

    toReturn.round = ((toReturn.round === undefined) || (toReturn.round === 'NaN')) ? 0 : toReturn.round;
    toReturn.aiScore = ((toReturn.aiScore === undefined) || (toReturn.aiScore === 'NaN')) ? 0 : toReturn.aiScore;
    toReturn.playerScore = ((toReturn.playerScore === undefined) || (toReturn.playerScore === 'NaN')) ? 0 : toReturn.playerScore;

    return toReturn;
  }
}
