/**
* Class StupidTris
* Main application class
*
* @author  Riccardo Giovarelli
*/
export default class StupidTris {
  constructor() {
    this.playerTurn = true;
    this.stateOfScoreTable = [];
    this.stateOfMatch = 1;
    this.faX = 'fas fa-times';
    this.fa0 = 'far fa-circle';
    this.roundCookieName = 'current-round';
    this.aiCookieName = 'current-AI-score';
    this.playerCookieName = 'current-PLAYER-score';
    this.field = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }
}
