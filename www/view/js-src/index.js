import 'babel-polyfill';
import 'bootstrap';
import MyTris from './myTris';
import './../style/main.css';
import * as TrisLib from './trisLib';

$(document).ready(() => {
  const myTrisObj = new MyTris();

  // Add click listeners
  document.getElementById('tris_grid').addEventListener('click', (e) => {
    myTrisObj.manageMove(e);
  });
  document.getElementById('footer').addEventListener('click', (e) => {
    myTrisObj.manageFooter(e);
  });

  // Check window resize
  $(window).resize(() => {
    TrisLib.adjustGrid();
  });

  // Paint current results
  MyTris.paintResults();

  // Initial grid setting
  TrisLib.adjustGrid();
});
