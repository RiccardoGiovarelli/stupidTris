import MyTris from './myTris';
import StupidTris from './stupidTris';

/**
* Class GameEngine
* Game engine class
*
* @author  Riccardo Giovarelli
*/
export default class GameEngine extends StupidTris {

  static callAiResponse(currentField) {
    const responsePromise = new Promise((resolve) => {
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
      };

      xhttp.open('POST', '../controller/trisController.php', true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send(`request=nextMoveRequest&currentGrid=${currentField}`);
    });

    responsePromise.then((response) => {
      const myTrisObj = new MyTris();
      myTrisObj.makeMove(response.row, response.col, 'ai');
      const currentResult = myTrisObj.checkCurrentState();
      if (currentResult !== 6) {
        myTrisObj.manageResults(currentResult);
      }
    });
  }
}
