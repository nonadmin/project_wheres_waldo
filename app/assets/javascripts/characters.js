var WALDO = WALDO || {};


WALDO.Characters = (function($){

  var _characters;

  init = function(){
    return _getCharacters();
  };

  list = function(){
    return _characters;
  };

  _getCharacters = function(){
    return $.ajax({
      method: "GET",
      url: Routes.characters_path({format: 'json'})
    }).done(function(characters){
      _characters = characters;
    });
  };

  return {
    list: list,
    init: init
  };

})($);