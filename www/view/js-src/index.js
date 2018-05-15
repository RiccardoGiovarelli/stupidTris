import 'babel-polyfill';
import 'bootstrap';
import MyTris from './myTris';
import './../style/main.css';

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
    const currentHeight = `${document.getElementById('tris_grid_container').offsetWidth}px`;
    document.getElementById('tris_grid').style.height = currentHeight;
  });

  // Paint current results
  MyTris.paintResults();

  // Set table height
  const currentHeight = `${document.getElementById('tris_grid_container').offsetWidth}px`;
  document.getElementById('tris_grid').style.height = currentHeight;
});
