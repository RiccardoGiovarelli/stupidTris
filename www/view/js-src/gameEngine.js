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
   * Return the next AI move
   */
  static findBestMove() {
    const responsePromise = new Promise((resolve) => {
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
      };

      xhttp.open('POST', '../controller/trisController.php', true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send(`request=nextMoveRequest&currentGrid=${this.field}`);
    });

    responsePromise.then((response) => {
      MyTris.makeMove(response[0], response[1], 'ai');
      const currentResult = MyTris.checkCurrentState(MyTris.field);
      if (currentResult !== 6) {
        MyTris.manageResults(currentResult);
      }
    });
  }
}
