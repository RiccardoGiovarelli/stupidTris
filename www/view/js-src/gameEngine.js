import MyTris from './myTris';
import StupidTris from './stupidTris';

/**
* Class GameEngine
* Game engine class
*
* @author  Riccardo Giovarelli
*/
export default class GameEngine extends StupidTris {
  constructor() {
    super();
    this.minmaxPromise = new Promise((resolve, reject, depth, isMax) => {
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
                this.minmaxPromise.then(
                  // eslint-disable-next-line no-loop-func
                  (result) => {
                    best = Math.max(best, result); this.field[i][j] = 0;
                  },
                  null,
                  depth + 1,
                  !isMax,
                );
              }
            }
          }
          resolve(best);
          break;
        case false:
          best = 1000;
          for (let i = 0; i < this.field.length; i += 1) {
            const line = this.field[i];
            for (let j = 0; j < line.length; j += 1) {
              if (this.field[i][j] === 0) {
                this.field[i][j] = 2;
                this.minmaxPromise.then(
                  // eslint-disable-next-line no-loop-func
                  (result) => {
                    best = Math.min(best, result); this.field[i][j] = 0;
                  },
                  null,
                  depth + 1,
                  !isMax,
                );
              }
            }
          }
          resolve(best);
          break;
        default:
          reject(Error('minmaxPromise error'));
          break;
      }
      return true;
    });
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
          console.log(this.field);
          moveVal = this.minimax(0, false);
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

  /**
  * Implementation of minimax function. It considers
  * all the possible ways for the match and returns
  * the value of the board
  */
  minmaxSync(depth, isMax) {
    this.minmaxPromise.then(
      result => result,
      null,
      depth,
      isMax,
    );
  }

/*
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
              best = Math.max(best, this.minimax(depth + 1, !isMax));
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
              best = Math.min(best, this.minimax(depth + 1, !isMax));
              this.field[i][j] = 0;
            }
          }
        }
        return best;
      default:
        return null;
    }
  }
*/
}
