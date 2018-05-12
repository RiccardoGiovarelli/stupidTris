export default class ScoreManager {
  constructor() {
    this.roundCookieName = 'current-round';
    this.aiCookieName = 'current-AI-score';
    this.playerCookieName = 'current-PLAYER-score';
  }

  // Save score
  static saveScore(who) {
    const currentSituation = ScoreManager.readScore();

    switch (who) {
      case 'ai':
        $.cookie(ScoreManager.roundCookieName, +currentSituation.currentRound + +1);
        $.cookie(ScoreManager.aiCookieName, +currentSituation.currentAiScore + +1);
        break;
      case 'player':
        $.cookie(ScoreManager.roundCookieName, +currentSituation.currentRound + +1);
        $.cookie(ScoreManager.playerCookieName, +currentSituation.currentPlayerScore + +1);
        break;
      default:
        break;
    }
  }

  // Reset score table
  static resetScore() {
  }

  // Read score table
  static readScore() {
    const toReturn = [];

    toReturn.round = $.cookie(ScoreManager.roundCookieName);
    toReturn.aiScore = $.cookie(ScoreManager.aiCookieName);
    toReturn.playerScore = $.cookie(ScoreManager.playerCookieName);

    toReturn.round = (toReturn.round === undefined) ? 0 : toReturn.round;
    toReturn.aiScore = (toReturn.aiScore === undefined) ? 0 : toReturn.aiScore;
    toReturn.playerScore = (toReturn.playerScore === undefined) ? 0 : toReturn.playerScore;

    return toReturn;
  }
}
