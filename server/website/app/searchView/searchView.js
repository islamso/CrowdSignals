'use strict';

angular.module('myApp.searchView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'searchView/searchView.html',
    controller: 'SearchViewController'
  });
}])

.controller('SearchViewController', ['$scope',function($scope) {
	$scope.datasetModel=={
		location:false,
		battery:false,
		appusage:false
	}
}]);