(function(){
  'use strict';

  angular
  .module('newIdea')
  .controller('ProfileController', ProfileController);

  function ProfileController($http, Firebase, FirebaseUrl, $firebaseObject, $stateParams){
    var vm = this;
    vm.add = add;
    var golfers = [];
    var name;
    var ref = new Firebase(FirebaseUrl);

    init();
    function init(){
      var user = $firebaseObject(ref.child('Users').child($stateParams.id));
      user.$loaded().then(function(){
        name = user.uid;
      });
    }

    $http.get('http://cors.io/?u=http://www.pgatour.com/data/r/current/leaderboard-v2.json')
    .success(function(data){
      //var tournamentName = data.leaderboard.tournament_name;
      var start = data.leaderboard.players;
      angular.forEach(start, function(a){
        var firstName = a.player_bio.first_name;
        var lastName = a.player_bio.last_name;
        var fullName = firstName +' '+lastName;
        golfers.push(fullName);
      });
      vm.players = golfers;
    });

    function add(golfer){
      /* TODO
        - add players to fb
        - add players to screen
        - keep count in fb
      */
      var userTeam = ref.child('userTeam').child(name).child('Team');
      userTeam.update({
        Name:golfer
      });
    }
  }
})();
