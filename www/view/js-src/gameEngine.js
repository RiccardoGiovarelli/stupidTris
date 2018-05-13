/**
* Class GameEngine
* Game engine class
*
* @author  Riccardo Giovarelli
*/
export default class GameEngine {
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
}
