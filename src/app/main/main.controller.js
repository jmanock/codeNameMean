(function() {
  'use strict';

  angular
    .module('codeNameMean')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($firebaseArray) {
    var vm = this;
    var url = 'https://fireseedangular.firebaseio.com/Weeks/Week1/0/Games';
    var ref = new Firebase(url);
    vm.weeks = $firebaseArray(ref);


    }
})();
