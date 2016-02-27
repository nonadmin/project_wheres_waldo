var WALDO = WALDO || {};


WALDO.Tag = (function($){

  var _activeTag;
  var _charactersList;

  init = function(){
    _buildCharactersList();
  };

  events = function(){
    $('.container').on('click', function(e){
      if ( $('.active').length ){
        $('.active').remove();
      } else {
        newTag({top: e.pageY, left: e.pageX});
      }
    });

    $('.container').on('click', 'li', function(e){
      e.stopImmediatePropagation();
      _tryTagging( $(e.target) );
    });
  };

  newTag = function(location){
    // set tag location relative to container's offset
    // so we can change DOM layout without updating tagging code 
    location.top -= $('.container').offset().top + 50;
    location.left -= $('.container').offset().left + 50;
    console.log(location);
    var tag = $('<div/>').addClass('tag active')
                         .offset(location)
                         .append( _charactersList );
    $('.container').append(tag);
    _activeTag = tag;
  };

  _buildCharactersList = function(){
    var characters = {1: 'Waldo', 2: 'Wenda', 3: 'Odlaw', 
                      4: 'Wizard Whitebeard', 5: 'Woof'};
    _charactersList = $('<ul/>').addClass('characters');
    $.each(Object.keys(characters), function(i, id){
      _charactersList.append( 
        $('<li/>', {'data-character': id}).text(characters[id]) 
      );
    });
  };

  _tryTagging = function($character){
    if ( _characterFound($character) ){
      _activeTag.removeClass('active').addClass('set');
      $character.siblings().remove();
      _buildCharactersList();
    }
  };


  _characterFound = function(){
    return true;
  };

  return {
    newTag: newTag,
    events: events,
    init: init
  };

})($);


$( document ).ready(function(){
  WALDO.Tag.events();
});

$( document ).on('page:change', function(){
  WALDO.Tag.init();
});