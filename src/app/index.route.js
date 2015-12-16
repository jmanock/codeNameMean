(function() {
  'use strict';

  angular
    .module('newIdea')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('profile',{
        url:'/profile/:id',
        templateUrl:'app/profile/profile.html',
        controller:'ProfileCOntroller',
        controllerAs:'profile'
      })
      .state('standings', {
        url:'/standings',
        templateUrl:'app/standings/standings.html',
        controllerAs:'standings'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
