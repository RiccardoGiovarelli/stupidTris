import 'babel-polyfill';
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
    $('#tris_grid').height($('#tris_grid_container').width());
  });

  // Paint current results
  MyTris.paintResults();

  // Set table height
  $('#tris_grid').height($('#tris_grid_container').width());
});
