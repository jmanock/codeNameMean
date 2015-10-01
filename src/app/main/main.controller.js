(function() {
  'use strict';

  angular
    .module('codeNameMean')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;
    $http.get('http://www.hockey-reference.com/leagues/NHL_2016_games.html')
    }
})();
