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
    var json = {
      "modules":
        [
          {
            "title":"name of module1",
            "description":"description of module1",
            "weeks":[{"id":1, "title":"Week 01"}]
          },
          {
            "title":"name of module2",
            "description":"description of module2",
            "weeks":[{"id":2, "title":"Week 02"},{"id":3, "title":"Week 03"}]
          },
          {
            "title":"name of module3",
            "description":"description of module3",
            "weeks":[{"id":4, "title":"Week 04"},{"id":5, "title":"Week fucking 5"}]
          }
        ]
    };
    $scope.ocw = json;
  }
})();
