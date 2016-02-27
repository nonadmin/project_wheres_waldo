var WALDO = WALDO || {};


WALDO.Image = (function($){

  init = function(){

  };

  events = function(){
    $('.container').hover(function(){
      $('.set').stop().fadeIn();
    }, function(){
      $('.set').stop().fadeOut(1400);
    });
  };

  return {
    events: events,
    init: init
  };

})($);


$( document ).ready(function(){
  WALDO.Image.events();
});

$( document ).on('page:change', function(){
  WALDO.Image.init();
});