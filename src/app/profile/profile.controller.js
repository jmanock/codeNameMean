(function(){
  'use strict';
  // http://cors.io/?u=http://www.pgatour.com/data/r/current/leaderboard-v2.json

  angular
  .module('newIdea')
  .controller('ProfileController', ProfileController);

  function ProfileController(Auth){
    var vm = this;
    vm.logout = logout;
    function logout(){
      Auth.$unauth();
    }
  }
})();
