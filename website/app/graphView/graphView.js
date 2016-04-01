'use strict';

angular.module('myApp.graphView', ['ngRoute','chart.js'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/graph', {
    templateUrl: 'graphView/graphView.html',
    controller: 'GraphViewController'
  });
}])

.controller('GraphViewController', ['$scope',function($scope) {
	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
}]);