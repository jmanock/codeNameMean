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
      var final = {};
      var uTeams = $firebaseArray(fRef);
      var teams = $firebaseArray(fireRef);
      teams.$loaded().then(function(data){
        angular.forEach(data, function(x){
          users.push(x.$id);
        });
        angular.forEach(users, function(a){
          angular.forEach(uTeams, function(b){
            
            if(a === b.$id){

              angular.forEach(b.Team, function(c){
                // console.log(c.Name);

                // final = {User:a,Team:[c.Name]};

              });
               //console.log(final);
            }
          });
        });

      /*  for(var i = 0; i<users.length && i<uTeams.length; i++){
          if(users[i] === uTeams[i].$id){
            // final.push({
            //   User:users[i],
            //   Team:uTeams[i].Team.Name
            // });
            var something = uTeams[i].Team;
            // final.push({
            //   User:users[i]
            // });
            final.Users = users[i];

            // angular.forEach(something, function(a){
            for(var b = 0; b<something.length; b++){
              console.log(b);
              // final.push({
              //   Team:a.Name
              // });


              vm.final = final;
            }
            // Would like user{team[p1,p2,p3,p4]}user{team[p1,p2,p3,p4]}

          }

        }*/

      });

    }
  }
})();
