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

  function StandingsController($scope){
    // var something = {
    //   "modules":
    //     [
    //       {
    //         "title":"name of module1",
    //         "description":"description of module1",
    //         "weeks":[{"id":1, "title":"Week 01"}]
    //       },
    //       {
    //         "title":"name of module2",
    //         "description":"description of module2",
    //         "weeks":[{"id":2, "title":"Week 02"},{"id":3, "title":"Week 03"}]
    //       },
    //       {
    //         "title":"name of module3",
    //         "description":"description of module3",
    //         "weeks":[{"id":4, "title":"Week 04"},{"id":5, "title":"Week fucking 5"}]
    //       }
    //     ]
    // };
    // $scope.ocw = something;

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
