import 'babel-polyfill';
import MyTris from './myTris';
import ScoreManager from './scoreManager';
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
    $('.center-container').height($('#tris_grid_container').width());
  });

  // Read current score ad set results
  const currentSituation = ScoreManager.readScore();
  $('#player_score_value').text(currentSituation.currentPlayerScore);
  $('#player_ia_value').text(currentSituation.currentAiScore);
  $('#match_value').text(currentSituation.currentRound);
  if (currentSituation.currentRound === 0) $('#reset_button').css('visibility', 'hidden');

  // Set table height
  $('.center-container').height($('#tris_grid_container').width());
});
