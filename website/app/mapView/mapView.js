'use strict';

angular.module('myApp.mapView', ['ngRoute','uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/map', {
		templateUrl: 'mapView/mapView.html',
		controller: 'MapViewController'
	});
}])
.controller('MapViewController', ['$scope','DataService','LocationService',function($scope,DataService,LocationService) {
    $scope.bounds={};
	$scope.settings = {

		map: { center: { latitude: 38.8833, longitude: -77.0167}, zoom: 4 },
        bounds:{
            northeast:{ latitude: 42.140015, longitude: -66.551881},
            southwest:{ latitude: 22.690595, longitude: -133.691100}
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

	// $scope.circles = [{
	// 	id: 1,
	// 	centre: {latitude: 39.422189, longitude: -102.024232},
	// 	radius: 500000,
	// 	stroke: {
	// 		color: '#6060FB',
	// 		weight: 3
	// 	},
	// 	editable: true,
	// 	draggable: true,
	// 	geodesic: true,
	// 	fill: {
	// 		color: '#49B6B0',
	// 		opacity: 0.8
	// 	}	
	// }];
	//markers.reduce(function(current, value, index){},[]);
	// $scope.markers = [
	// 	{
	// 		id: 1,
	// 		coords: {latitude: 40, longitude: -120},
	// 		app: ['Flickr', 'Facebook', 'Snapchat'],
	// 		show: false
	// 	},
	// 	{
	// 		id: 2,
	// 		coords: {latitude: 35, longitude: -100},
	// 		app: ['Facebook', 'Reddit'],
	// 		show: false
	// 	},
	// 	{
	// 		id: 3,
	// 		coords: {latitude: 34, longitude: -115},
	// 		app: ['Reddit', 'Snapchat', 'Chrome'],
	// 		show: false
	// 	},
	// 	{
	// 		id: 4,
	// 		coords: {latitude: 33, longitude: -116},
	// 		app: ['Reddit', 'Snapchat', 'Chrome'],
	// 		show: false
	// 	},
	// 	{
	// 		id: 5,
	// 		coords: {latitude: 30, longitude: -100},
	// 		app: ['Reddit', 'Snapchat', 'Chrome'],
	// 		show: false
	// 	},
	// 	{
	// 		id: 6,
	// 		coords: {latitude: 36.5, longitude: -112},
	// 		app: ['Reddit', 'Snapchat', 'Chrome'],
	// 		show: false
	// 	},
	// 	{
	// 		id: 7,
	// 		coords: {latitude: 34.5, longitude: -112.5},
	// 		app: ['Reddit', 'Snapchat', 'Chrome'],
	// 		show: false
	// 	},
	// 	{
	// 		id: 8,
	// 		coords: {latitude: 35.1, longitude: -113.7},
	// 		app: ['Reddit', 'Snapchat', 'Chrome'],
	// 		show: false
	// 	}
	// ];

	$scope.onClick = function(marker, eventName, model)
	{
		model.show = !model.show;
		console.log('clicked!' + model.id);
	};

    $scope.circleFilter=
        {
            id: 1234,
            center:{ latitude: 38.8833, longitude: -77.0167},
            radius: 500000,
            stroke: {
                color: '#08B21F',
                weight: 2,
                opacity: 1
            },
            fill: {
                color: '#08B21F',
                opacity: 0.5
            },
            geodesic: true, // optional: defaults to false
            draggable: true, // optional: defaults to false
            clickable: true, // optional: defaults to true
            editable: true, // optional: defaults to false
            visible: true, // optional: defaults to true
            control: {}
        };

    $scope.markerLocationData=DataService.getLocationData();
    var gen=idMaker();
    $scope.markers=[];
    $scope.createMarkers=function()
    {
        $scope.prototypeMarkers=[];
        var counter=0;
        var bounds=$scope.settings.bounds;
        var min_longitude=bounds.southwest.longitude, 
            max_longitude=bounds.southwest.longitude, 
            min_latitude=bounds.southwest.latitude, 
            max_latitude=bounds.northeast.latitude;

        while(gen.next().value!=100)
        {
            var marker={};
            marker.id=counter++;
            marker.latitude=  getNewLat();
            marker.longitude= getNewLong();
            $scope.prototypeMarkers.push(marker);
        }
        function getNewLong(){return parseFloat(Math.random()*max_longitude);}
        function getNewLat(){return parseFloat(Math.random()*max_latitude); } 
    }
    $scope.createMarkers();

    function* idMaker(){
      var index = 0;
      while(true)
        yield index++;
    }




    $scope.refresh=function()
    {
        $scope.markers=$scope.prototypeMarkers.filter((marker)=> 
            {
                return (LocationService.distance(marker, $scope.circleFilter.center)*100000 <  $scope.circleFilter.radius)
            });
        $scope.markers.map((marker)=>
        {
            marker.app=['Reddit', 'Snapchat', 'Chrome', 'Facebook', 'Flickr'];
            marker.show=false;
            return marker;
        });
    }
}]);

