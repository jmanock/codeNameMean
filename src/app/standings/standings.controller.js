(function(){
  'use strict';
  angular
  .module('newIdea')
  .controller('StandingsController', StandingsController);

  // function StandingsController(Firebase, $firebaseArray){
  //   var vm = this;
  //   var fireRef = new Firebase('https://reditclone.firebaseio.com/Users');
  //   var fRef = new Firebase('https://reditclone.firebaseio.com/userTeam');
  //
  // }

  function StandingsController($scope, Firebase, $stateParams, $firebaseObject){
    var sIds;
    var pNames = [];
    var fRef = new Firebase('https://reditclone.firebaseio.com/userTeam');
    var obj = $firebaseObject(fRef);
    obj.$loaded().then(function(){
      angular.forEach(obj, function(value, key){
        sIds = key;
        pNames.push({
          users:sIds,
        });
      });
      var something = {
        "Users":[
          {
            "user":pNames,
            "team":[{"player":"make something up"}]
          }
        ]
      };
      $scope.deep = pNames;
    });
    // Figure out how the fuck to get the top to look like the bottom
    var works = {
      "Users":
      [
        {
          "User":"Jim Chaser",
          "team":[{"Player":"Tiger Woods", "Points":50},{"Player":"Jordan Speith", "Points":200},{"Player":"Dustin Johnson", "Points":300}, {"Player":"Sergio Garcia", "Points":123}]
        },
        {
          "User":"Brit Fernandez",
          "team":[{"Player":"Jordan Speith", "Points":132}, {"Player":"Jason Day", "Points":321}, {"Player":"Rory Mac", "Points":234},{"Player":"Sergio Garcia", "Points":243}]
        },
        {
          "User":"Jon Mac",
          "team":[{"Player":"Zach Jonshon", "Points":432}, {"Player":"Brooks Kopa", "Points":555},{"Player":"Scott Stallings", "Points":345}, {'Player':"Tony Funu", "Points":999}]
        }
      ]
    };

    $scope.test = works;
  }
})();
