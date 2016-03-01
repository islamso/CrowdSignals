'use strict';

angular.module('myApp.mapView', ['ngRoute','uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'mapView/mapView.html',
    controller: 'MapViewController'
  });
}])

.controller('MapViewController', ['$scope',function($scope) {
	$scope.settings={
		map: { center: { latitude: 38.8833, longitude: -77.0167}, zoom: 4 },
		bounds: {
			northeast:{	latitude: 49.140015, longitude: -66.551881},
			southwest:{	latitude: 22.690595, longitude: -133.691100}
		}
	};
    $scope.polygons = [
        {
            id: 1,
            path: [
                {
                    latitude: 50,
                    longitude: -80
                },
                {
                    latitude: 30,
                    longitude: -120
                },
                {
                    latitude: 20,
                    longitude: -95
                }
            ],
            stroke: {
                color: '#6060FB',
                weight: 3
            },
            editable: true,
            draggable: true,
            geodesic: true,
            visible: true,
            fill: {
                color: '#ff0000',
                opacity: 0.8
            }
        }
    ];
}]);