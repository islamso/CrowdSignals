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
.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
  $httpProvider.defaults.withCredentials = true;
}])
.constant('ApiUrl','http://crowdsignals.eu-1.evennode.com/api/')