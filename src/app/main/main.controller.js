(function() {
  'use strict';

  angular
    .module('codeNameMean')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($firebaseArray) {
    var vm = this;
    var url = 'https://fireseedangular.firebaseio.com/Week1';
    var ref = new Firebase(url);
    vm.weeks = $firebaseArray(ref);
    console.log(vm.weeks);

    }
})();
