var WALDO = WALDO || {};


WALDO.Game = (function($){

  var _score = 90;
  var _highScore;
  var _timerID;

  init = function(){
    _startTimer();
    _highScore = parseInt( $('#score').text() );
    $('.time-remaining span').text(_score);
  };

  events = function(){

  };

  gameOver = function(all_tags_found){
    if (all_tags_found){
      clearInterval(_timerID);
      _checkHighScore();
    }
  };

  _startTimer = function(){
    _timerID = setInterval(function(){
      if (_score > 0){
        _score -= 1;
        $('.time-remaining span').text(_score);
      }
    }, 1000);
  };

  _checkHighScore = function(){
    if (_score > _highScore){

      var id = $('.highscore').data("hs-id");
      var highscoreData = JSON.stringify({
        player: prompt("Congratulations, new highscore!  What's your name?"),
        score: _score
      });

      $.ajax({
        method: 'PATCH',
        url: Routes.highscore_path(id, {format: 'json'}),
        data: highscoreData,
        contentType: "application/json",
        dataType: "json"
      }).done(function(hs){
        $("#player").text(hs.player);
        $("#score").text(hs.score);
      });

    } else {

      alert("You found everyone, but didn't get a new highscore :( Refresh to play again!");
    }
    
  };

  return {
    events: events,
    init: init,
    gameOver: gameOver
  };

})($);


$( document ).ready(function(){
  WALDO.Game.events();
});

$( document ).on('page:change', function(){
  WALDO.Game.init();
});