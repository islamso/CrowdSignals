'use strict';

angular.module('myApp.loginView', ['ngRoute','uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'loginView/loginView.html',
    controller: 'LoginViewController'
  });
}])
.controller('LoginViewController', ['$scope',function($scope) {
}]);