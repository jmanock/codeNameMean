(function() {
  'use strict';

  angular
    .module('codeNameMean')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($firebaseArray, $scope, $timeout) {
    var vm = this;
    var url = 'https://fireseedangular.firebaseio.com/Weeks/Week1/';
    var ref = new Firebase(url);
    vm.weeks = $firebaseArray(ref);

    $scope.copy = {
      p1:['c1 p1', 'c1 p2'],
      p3:['c3 p1', 'c3 p2', 'c3 p4', 'c3 p5']
    };

    $scope.courts = [
      {
        'number':1,
        'name':'the best court',
        'numOfPlayers':2
      },{
        'number':2,
        'name':'the bad court',
        'numOfPlayers':0
      },{
        'number':3,
        'name':'the other court',
        'numOfPlayer':5
      }
    ];

    $scope.loadPlayers = function(court){
      $timeout(function(){
        $scope.players = $scope.copy['p'+court.number]||[];
      }, Math.random()*2000);
    };

    $scope.showDetails = function(court){
      if(court.numOfPlayers){
        delete $scope.players;
        $scope.loadPlayers(court);
      }else{
        $scope.players = [];
      }
    };
    }
})();
