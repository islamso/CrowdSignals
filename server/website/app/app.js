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
//Configutartion of main module
.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider) {
  $routeProvider.otherwise({redirectTo: '/search'});
  //$httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('AuthenticationInterceptor');
}])
//Method to run on initialisation of myApp
.run(['$rootScope','$location','AuthenticationService',function($rootScope,$location,AuthenticationService) {
  $rootScope.loggedIn=true;
  $rootScope.logout=function()
  {
    $rootScope.loggedIn=false;
    AuthenticationService.logout();
    $location.path('/');
  }
  $rootScope.$on('$locationChangeStart',function(){
    if(!AuthenticationService.isLoggedIn())
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
.constant('ApiUrl','')