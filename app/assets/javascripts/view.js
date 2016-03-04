var WALDO = WALDO || {};


WALDO.View = (function($){

  var _characters;

  var init = function(characters){
    _characters = characters;
  };

  var events = function(){
    $('.container').on('click', function(e){
      if ( $('.active').length ){
        $('.active').remove();
      } else {
        // need something to talk back to controller here
        WALDO.Game.newActiveTag( {top: e.pageY, left: e.pageX} );
        _addActiveTag({top: e.pageY, left: e.pageX});
      }
    });

    $('.container').on('click', 'li', function(e){
      e.stopImmediatePropagation();
      // talk to controller
      WALDO.Game.tryTagging( $(e.target).data('id') );
    });

    $('.container').on('click', '.close', function(e){
      e.stopImmediatePropagation();
      // talk to controller
      WALDO.Game.removeTag( $(e.target).data('id') );
    });

    $('.container').hover(function(){
      $('.set').stop().fadeIn();
    }, function(){
      $('.set').stop().fadeOut(1400);
    });
  };

  var removeTag = function(tagID){
    $('[data-id=' + tagID + ']').remove();
  };

  var failedTagging = function(){
    $('.active').fadeOut(150).fadeIn(150)
                .fadeOut(150).fadeIn(150)
                .fadeOut(150, function(e){
                                $(this).remove();
                              });
  };

  var addSavedTag = function(location, character, tagID){
    $('.active').remove();

    var tag = _div(location);
    tag.addClass('set').append(
      '<ul class="characters"><li>'+ character + '</li></ul>'
    ).append(
      '<div data-id="' + tagID + '" class="close">x</div>'
    ).attr({'data-id': tagID});
    $('.container').append(tag);
  };

  var updateScore = function(newScore){
    $('.time-remaining span').text(newScore);
  };

  var updateHighScore = function(score, player){
    $('#score').text(score);
    $('#player').text(player);
  };

  var _addActiveTag = function(location){
    var tag = _div(location);
    tag.addClass('active').append( _charactersList() );
    $('.container').append(tag);
  };

  var _div = function(location){
    // set tag location relative to container's offset
    // so we can change DOM layout without updating tagging code 
    location.top -= $('.container').offset().top + 50;
    location.left -= $('.container').offset().left + 50;
    return $('<div/>').addClass('tag').offset(location);
  };

  var _charactersList = function(){
    var list = $('<ul/>').addClass('characters');

    $.each(_characters, function(i, character){
      list.append( 
        $('<li/>', {'data-id': character.id}).text(character.name)
      );
    });

    return list;
  };

  return {
    addSavedTag: addSavedTag,
    removeTag: removeTag,
    updateScore: updateScore,
    updateHighScore: updateHighScore,
    failedTagging: failedTagging,
    init: init,
    events: events
  };

})($);