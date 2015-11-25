(function() {
  'use strict';

  angular
    .module('newIdea')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {
    
    $.getJSON('http://cors.io/?u=http://www.pgatour.com/data/r/current/leaderboard-v2.json',function(data){
      var player = data.leaderboard.players;
      player.forEach(function(x){
        var firstName = x.player_bio.first_name;
        var lastName = x.player_bio.last_name;
        var fullName = firstName + ' '+ lastName;
        // console.log(fullName);

      });

    });

  }
})();
