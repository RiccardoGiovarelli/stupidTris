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
   * Method generateNextMove
   *
   * Generate next Stupid Ai move
   *
   * @param currentGrid The grid in the current match
   * @returns array with coordinates of the next move
   */
  static generateNextMove(currentGrid) {
    const result = [];
    const currentGridMono = [];
    let cursor = 0;
    let freeCount = 0;
    let numberOfMove = 0;

    for (let x = 0; x < currentGrid.length; x += 1) {
      const line = currentGrid[x];
      for (let y = 0; y < line.length; y += 1) {
        if (currentGrid[x][y] !== 0) numberOfMove += 1;
        currentGridMono[cursor] = currentGrid[x][y];
        cursor += 1;
      }
    }

    numberOfMove = 9 - numberOfMove;
    const move = Math.floor((Math.random() * numberOfMove) + 1);
    cursor = 0;

    while (result.length === 0) {
      switch (true) {
        case (currentGridMono[cursor] === 0 && freeCount === move):
          result[0] = Math.floor(cursor / 3);
          result[1] = (cursor % 3);
          break;
        case (currentGridMono[cursor] === 0 && freeCount !== move):
          freeCount += 1;
          if (freeCount !== move) cursor += 1;
          break;
        case (currentGridMono[cursor] !== 0):
          cursor += 1;
          break;
        default:
          break;
      }
    }

    if (result.length > 0) return result;
    return false;
  }


  /**
  * Implementation of minimax function. It considers
  * all the possible ways for the match and returns
  * the value of the board
  */
  static minimax(minimaxGrid, depth, isMax) {
    const tmpMinimaxGrid = minimaxGrid;
    const currentResult = MyTris.checkCurrentState(tmpMinimaxGrid);

    if (currentResult !== 6) return currentResult;

    switch (currentResult) {
      case 10:
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
        for (let i = 0; i < tmpMinimaxGrid.length; i += 1) {
          const line = tmpMinimaxGrid[i];
          for (let j = 0; j < line.length; j += 1) {
            if (tmpMinimaxGrid[i][j] === 0) {
              tmpMinimaxGrid[i][j] = 1;
              best = Math.max(best, this.minimax(tmpMinimaxGrid, depth + 1, !isMax));
              tmpMinimaxGrid[i][j] = 0;
            }
          }
        }
        return best;
      case false:
        best = 1000;
        for (let i = 0; i < tmpMinimaxGrid.length; i += 1) {
          const line = tmpMinimaxGrid[i];
          for (let j = 0; j < line.length; j += 1) {
            if (tmpMinimaxGrid[i][j] === 0) {
              tmpMinimaxGrid[i][j] = 2;
              best = Math.min(best, this.minimax(tmpMinimaxGrid, depth + 1, !isMax));
              tmpMinimaxGrid[i][j] = 0;
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
  static findBestMove(targetGrid) {
    const tmpTargetGrid = targetGrid;
    let bestVal = -1000;
    const bestMove = {
      row: -1,
      col: -1,
    };

    for (let i = 0; i < tmpTargetGrid.length; i += 1) {
      const line = tmpTargetGrid[i];
      for (let j = 0; j < line.length; j += 1) {
        if (tmpTargetGrid[i][j] === 0) {
          tmpTargetGrid[i][j] = 1;
          const moveVal = this.minimax(tmpTargetGrid, 0, false);
          tmpTargetGrid[i][j] = 0;
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
