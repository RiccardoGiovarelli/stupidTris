import MyTris from './myTris';
import StupidTris from './stupidTris';

/**
* Class GameEngine
* Game engine class
*
* @author  Riccardo Giovarelli
*/
export default class GameEngine extends StupidTris {
  /**
  * Implementation of minimax function. It considers
  * all the possible ways for the match and returns
  * the value of the board
  */
  minimax(depth, isMax) {
    const currentResult = MyTris.checkCurrentState(this.field);
    switch (currentResult) {
      case 10:
        return currentResult;
      case -10:
        return currentResult;
      case 3:
        return 0;
      default:
        break;
    }

    let best = 0;

    switch (isMax) {
      case true:
        best = -1000;
        for (let i = 0; i < this.field.length; i += 1) {
          const line = this.field[i];
          for (let j = 0; j < line.length; j += 1) {
            if (this.field[i][j] === 0) {
              this.field[i][j] = 1;
              best = Math.max(best, this.minimax(this.field, depth + 1, !isMax));
              this.field[i][j] = 0;
            }
          }
        }
        return best;
      case false:
        best = 1000;
        for (let i = 0; i < this.field.length; i += 1) {
          const line = this.field[i];
          for (let j = 0; j < line.length; j += 1) {
            if (this.field[i][j] === 0) {
              this.field[i][j] = 2;
              best = Math.min(best, this.minimax(this.field, depth + 1, !isMax));
              this.field[i][j] = 0;
            }
          }
        }
        return best;
      default:
        return null;
    }
  }

  /**
   * Return the best possible move for the player
   */
  findBestMove() {
    let bestVal = -1000;
    let moveVal = 0;
    const bestMove = {
      row: -1,
      col: -1,
    };

    for (let i = 0; i < this.field.length; i += 1) {
      const line = this.field[i];
      for (let j = 0; j < line.length; j += 1) {
        if (this.field[i][j] === 0) {
          this.field[i][j] = 1;
          moveVal = this.minimax(this.field, 0, false);
          this.field[i][j] = 0;
          if (moveVal > bestVal) {
            bestMove.row = i;
            bestMove.col = j;
            bestVal = moveVal;
          }
        }
      }
    }
    return bestMove;
  }
}
