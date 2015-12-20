(function(){
  'use strict';
  angular
  .module('newIdea')
  .controller('StandingsController', StandingsController);

  function StandingsController(Firebase, $firebaseArray){
    var vm = this;
    var fireRef = new Firebase('https://reditclone.firebaseio.com/Users');
    var fRef = new Firebase('https://reditclone.firebaseio.com/userTeam');

    init();
    function init(){
      var users = [];
      var uTeams = $firebaseArray(fRef);
      var teams = $firebaseArray(fireRef);
      teams.$loaded().then(function(data){
        angular.forEach(data, function(x){
          users.push(x.$id);
        });
        for(var i = 0; i<users.length && i<uTeams.length; i++){
          if(users[i] === uTeams[i].$id){
            console.log('Hello Friend');
          }
        }
      });

    }
  }
})();
