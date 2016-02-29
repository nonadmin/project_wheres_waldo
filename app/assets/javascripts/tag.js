var WALDO = WALDO || {};


WALDO.Tag = (function($, Characters, Game){

  var _activeTagLocation;
  var _charactersList;

  init = function(){
    _buildCharactersList();
  };

  events = function(){
    $('.container').on('click', function(e){
      if ( $('.active').length ){
        $('.active').remove();
      } else {
        _activeTagLocation = {top: e.pageY, left: e.pageX};
        _activeTag({top: e.pageY, left: e.pageX});
      }
    });

    $('.container').on('click', 'li', function(e){
      e.stopImmediatePropagation();
      _tryTagging( $(e.target) );
    });

    $('.container').on('click', '.close', function(e){
      e.stopImmediatePropagation();
      _removeTag( $(e.target) );
    });
  };

  savedTag = function(location, character, tag_id){
    var tag = _div(location);
    tag.addClass('set').append(
      '<ul class="characters"><li>'+ character + '</li></ul>'
    ).append(
      '<div data-id="' + tag_id + '" class="close">x</div>'
    ).attr({'data-id': tag_id});
    $('.container').append(tag);
  };

  _activeTag = function(location){
    var tag = _div(location);
    tag.addClass('active').append(_charactersList);
    $('.container').append(tag);
  };

  _div = function(location){
    // set tag location relative to container's offset
    // so we can change DOM layout without updating tagging code 
    location.top -= $('.container').offset().top + 50;
    location.left -= $('.container').offset().left + 50;
    return $('<div/>').addClass('tag').offset(location);
  };

  _buildCharactersList = function(){
    _charactersList = $('<ul/>').addClass('characters');

    $.each(Characters.list(), function(i, character){
      _charactersList.append( 
        $('<li/>', {'data-id': character.id}).text(character.name)
      );
    });
  };

  _tryTagging = function($character){
    _saveTag($character).done(function(tag){      
      savedTag(_activeTagLocation, tag.character.name, tag.id);
      $('.active').remove();
      Game.gameOver(tag.game["all_tags_found?"]);
    }).fail(function(){
      $('.active').fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150).fadeOut(150, function(e){
        $(this).remove();
      });
    });
  };

  _saveTag = function($character){
    var tagData = JSON.stringify({
      game_id: $('.container').data('game-id'),
      character_id: $character.data('id'),
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

  _removeTag = function($tag){
    var tag_id = $tag.data('id');

    $.ajax({
      method: 'DELETE',
      url: Routes.tag_path(tag_id, {format: 'json'})
    }).done(function(){
      $('[data-id=' + tag_id + ']').remove();
    });
  };

  return {
    savedTag: savedTag,
    events: events,
    init: init
  };

})($, WALDO.Characters, WALDO.Game);


$( document ).ready(function(){
  WALDO.Tag.events();
});

$( document ).on('page:change', function(){
  WALDO.Characters.init().done(function(){
    WALDO.Tag.init();
  });
  
});