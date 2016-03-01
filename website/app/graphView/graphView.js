'use strict';

angular.module('myApp.graphView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/graph', {
    templateUrl: 'graphView/graphView.html',
    controller: 'GraphViewController'
  });
}])

.controller('GraphViewController', [function() {

}]);