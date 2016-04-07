'use strict';

angular.module('myApp.searchView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'searchView/searchView.html',
    controller: 'SearchViewController'
  });
}])

.controller('SearchViewController', ['$scope','$location',function($scope,$location) {
	$scope.datasetModel=={
		location:false,
		battery:false,
		appusage:false
	}

	$scope.map=function()
	{
		var params="";
		if($scope.maxUsers)params+="user_id__lte="+$scope.maxUsers+"&";
		if($scope.fromDate)params+="start__lte="+$scope.fromDate.getTime()*1000000+"&"
		if($scope.untilDate)params+="end__lte="+$scope.untilDate.getTime()*1000000
		params=(params.length > 0)?"/map?"+params:"/map";
		$location.path(params);
	}

}]);