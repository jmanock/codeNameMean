(function() {
  'use strict';

  angular
    .module('newIdea')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http) {
    var something = [];
    // $.getJSON('http://cors.io/?u=http://www.pgatour.com/data/r/current/leaderboard-v2.json',function(data){
    //   var player = data.leaderboard.players;
    //   player.forEach(function(x){
    //     var firstName = x.player_bio.first_name;
    //     var lastName = x.player_bio.last_name;
    //     var fullName = firstName + ' '+ lastName;
    //     something.push(fullName);
    //   });
    //   $scope.players = something;
    //   console.log(something);
    // });
    $http.get('http://cors.io/?u=http://www.pgatour.com/data/r/current/leaderboard-v2.json')
    .success(function(data){
      var players = [];
      var player = data.leaderboard.players;
      angular.forEach(player, function(x){
        var firstName = x.player_bio.first_name;
        var lastName = x.player_bio.last_name;
        var fullName = firstName + ' '+ lastName;
        players.push(fullName);
      });
      $scope.players = players;
    });

  }
})();
