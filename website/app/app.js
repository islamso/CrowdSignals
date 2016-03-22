'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.mapView',
  'myApp.graphView',
  'myApp.filterView',
  'myApp.loginView'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);