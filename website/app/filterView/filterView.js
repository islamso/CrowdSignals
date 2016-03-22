'use strict';

angular.module('myApp.filterView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/filter', {
    templateUrl: 'filterView/filterView.html',
    controller: 'FilterViewController'
  });
}])

.controller('FilterViewController', ['$scope',function($scope) {
	$scope.list=[
		"Oisin",
		"Tiarnan",
		"Sofwat",
		"Craig"
	];
}]);