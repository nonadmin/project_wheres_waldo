var WALDO = WALDO || {};


WALDO.Model = (function(){

  var _gameId;
  var _highScoreId;
  var _currentHighScore;
  var _currentScore;
  var _activeTagLocation;

  var init = function(){
    _gameId = $('.container').data('game-id');
    _highScoreId = $('.highscore').data('hs-id');
    _currentHighScore = parseInt( $('#score').text() );
    _currentScore = $('.time-remaining span').text();
  };

  var newActiveTag = function(location){
    _activeTagLocation = location;
  };

  var incrementScore = function(){
    if (_currentScore > 0){
      _currentScore -= 1;
    }
  };

  var getCurrentScore = function(){
    return _currentScore;
  };

  var newHighScore = function(){
    return _currentScore > _currentHighScore;
  };

  var getCharacters = function(){
    return $.ajax({
      method: "GET",
      url: Routes.characters_path({format: 'json'})
    });
  };

  var saveTag = function(characterID){
    var tagData = JSON.stringify({
      game_id: _gameId,
      character_id: characterID,
      pos_x: _activeTagLocation.left,
      pos_y: _activeTagLocation.top
    });

    return $.ajax({
      method: 'POST',
      url: Routes.tags_path({format: 'json'}),
      data: tagData,
      contentType: "application/json",
      dataType: "json"
    });
  };

  var removeTag = function(tagID){
    return $.ajax({
      method: 'DELETE',
      url: Routes.tag_path(tagID, {format: 'json'})
    });
  };

  var updateHighScore = function(player_name){
    var highscoreData = JSON.stringify({
        player: player_name,
        score: _currentScore
      });

    return $.ajax({
      method: 'PATCH',
      url: Routes.highscore_path(_highScoreId, {format: 'json'}),
      data: highscoreData,
      contentType: "application/json",
      dataType: "json"
    });
  };

  return {
    init: init,
    newActiveTag: newActiveTag,
    incrementScore: incrementScore,
    getCurrentScore: getCurrentScore,
    getCharacters: getCharacters,
    newHighScore: newHighScore,
    saveTag: saveTag,
    removeTag: removeTag,
    updateHighScore: updateHighScore
  };

}());