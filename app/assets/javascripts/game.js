var WALDO = WALDO || {};


WALDO.Game = (function($, Model, View){

  var _timerID;

  var init = function(){
    _timer();
  };

  var _gameOver = function(all_tags_found){
    if (all_tags_found){
      clearInterval(_timerID);
      _checkHighScore();
    }
  };

  var newActiveTag = function(location){
    Model.newActiveTag(location);
  };

  var tryTagging = function(characterID){
    Model.saveTag(characterID)
         .done(function(tag){
            // tag worked, is valid
            View.addSavedTag( {top: tag.pos_y, left: tag.pos_x}, 
                              tag.character.name, tag.id );
            _gameOver( tag.game["all_tags_found?"] ); })
         
         .fail(function(){
            // tag is invalid
            View.failedTagging();

      });
  };

  var removeTag = function(tagID){
    Model.removeTag(tagID).done(function(){
      View.removeTag(tagID);
    });
  };

  var _timer = function(){
    _timerID = setInterval(function(){
      Model.incrementScore();
      View.updateScore( Model.getCurrentScore() );
    }, 1000);
  };

  var _checkHighScore = function(){
    if ( Model.newHighScore() ){

      var player = prompt("Congratulations, new highscore!  What's your name?");
      Model.updateHighScore( player ).done(function(hs){
        View.updateHighScore(hs.score, hs.player);
      });

    } else {

      alert("You found everyone, but didn't get a new highscore :( Refresh to play again!");
    }
  };

  return {
    init: init,
    newActiveTag: newActiveTag,
    tryTagging: tryTagging,
    removeTag: removeTag
  };

})($, WALDO.Model, WALDO.View);


$( document ).ready(function(){
  WALDO.View.events();
});

$( document ).on('page:change', function(){
  WALDO.Model.init();
  WALDO.Game.init();
  WALDO.Model.getCharacters().done(function(characters){
      WALDO.View.init(characters);
    });
});