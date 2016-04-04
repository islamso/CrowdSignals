'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'chart.js',
  'ui.bootstrap',
  'ngRoute',
  'ngCookies',
  'myApp.services',
  'myApp.mapView',
  'myApp.graphView',
  'myApp.searchView',
  'myApp.loginView'
])
.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider) {
  $routeProvider.otherwise({redirectTo: '/search'});
  //$httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('AuthenticationInterceptor');
}])
.run(['$rootScope','$location','AuthenticationService',function($rootScope,$location,AuthenticationService) {
  $rootScope.loggedIn=true;
  $rootScope.logout=function()
  {
    $rootScope.loggedIn=false;
    AuthenticationService.logout();
    $location.path('/');
  }
  $rootScope.$on('$locationChangeStart',function(){
    if(!AuthenticationService.isLoggedIn(event))
    {
      $rootScope.loggedIn=false;
      event.preventDefault();
      $location.path('/login');
    }
    else
    {
      $rootScope.loggedIn=true;
    }
  });
}])
.constant('ApiUrl','http://crowdsignals.eu-1.evennode.com')