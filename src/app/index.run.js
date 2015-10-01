(function() {
  'use strict';

  angular
    .module('codeNameMean')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
