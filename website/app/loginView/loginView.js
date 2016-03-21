'use strict';

angular.module('myApp.loginView', ['ngRoute','uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'loginView/loginView.html',
    controller: 'LoginViewController'
  });
}])
.controller('LoginViewController', ['$scope',function($scope) {
}]);