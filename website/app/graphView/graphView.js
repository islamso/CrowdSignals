'use strict';

angular.module('myApp.graphView', ['ngRoute','chart.js'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/graph', {
    templateUrl: 'graphView/graphView.html',
    controller: 'GraphViewController'
  });
}])

.controller('GraphViewController', ['$scope',function($scope) {
	$scope.Linelabels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.Lineseries = ['Series A', 'Series B'];
	$scope.lineColors = ['Red', 'Blue'];
	$scope.Linedata = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];

	$scope.radarLabels = ["Facebook", "Reddit", "WhatsApp", "Daft", "Chrome", "Gmail"];
	$scope.radarData = [
	[13, 57, 23, 68, 15, 68],
	[56, 34, 78, 12, 70, 44]
	];

	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};

	$scope.barChartLabels = ["00:00-03:59", "04:00-07:59", "08:00-11:59", "12:00-15:59", "16:00-19:59", "20:00-23:59"];
	$scope.barChartSeries = ["Series A", "Series B"];
	$scope.barChartData = [
	[100, 100, 90, 60, 30, 85],
	[15, 50, 100, 80, 60, 40]
	];

	$scope.showLine=false;
	$scope.showRadar=false;
	$scope.showBar=false;

	$scope.clickLine=function()
	{
		$scope.showLine = true;
		$scope.showRadar= false;
		$scope.showBar = false;
	}

	$scope.clickRadar=function()
	{
		$scope.showLine = false;
		$scope.showRadar = true;
		$scope.showBar = false;
	}

	$scope.clickBar=function()
	{
		$scope.showLine = false;
		$scope.showRadar = false;
		$scope.showBar = true;
	}
}]);