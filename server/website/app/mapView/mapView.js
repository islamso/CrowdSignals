'use strict';

angular.module('myApp.mapView', ['ngRoute','uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/map', {
		templateUrl: 'mapView/mapView.html',
		controller: 'MapViewController'
	});

    $routeProvider.when('/map?:param', {
        templateUrl: 'mapView/mapView.html',
        controller: 'MapViewController'
    });
}])
.controller('MapViewController', ['$scope','ApiService','LocationService','MarkerService','$routeParams',function($scope,ApiService,LocationService,MarkerService,$routeParams) {
    $scope.markers=[];
    $scope.prototypeMarkers=[];
    $scope.selectApps=[];


    console.log($routeParams);

    $scope.markerWindow={
        show:false,
        coords:{latitude:0, longitude:0}
    };
	ApiService.getLocations().success(function(data)
		{
				$scope.data=data;
				$scope.createMarkers();
		});
    $scope.status={
        users:false,
        date:false,
        custom:false
    }
    $scope.bounds={};
	$scope.settings = {

		map: { center: { latitude: 47.609722, longitude: -122.333056}, zoom: 10 },
        bounds:{
            northeast:{ latitude: 42.140015, longitude: -66.551881},
            southwest:{ latitude: 22.690595, longitude: -133.691100}
        }
	};

	$scope.onClick = function(marker, eventName, model)
	{
		model.show = !model.show;
	};

    $scope.circleFilter= {id: 1234, center:{ latitude: 47.609722, longitude: -122.333056}, radius: 5000, stroke: {color: '#08B21F', weight: 2, opacity: 1 }, fill: {color: '#08B21F', opacity: 0.5 }, geodesic: true, draggable: true,clickable: true,editable: true,visible: false, control: {} }; $scope.markers=[];
    $scope.selectApps=[];
    $scope.createMarkers=function()
    {
        $scope.prototypeMarkers=MarkerService.parse($scope.data);
        $scope.refresh();
    }



    $scope.refresh=function()
    {
        $scope.markers=$scope.prototypeMarkers;
        if($scope.circleFilter.visible)
        {
            $scope.markers=MarkerService.filter.location($scope.prototypeMarkers,$scope.circleFilter.center, $scope.circleFilter.center);
        }   
        $scope.averageSpeed=MarkerService.stat.speed($scope.markers);
    }

    $scope.userFilter=function(userId)
    {
        $scope.markers=MarkerService.filter.user($scope.markers, userId)
    }

    $scope.appFilter=function(name)
    {
        $scope.markers=$scope.prototypeMarkers.filter((marker)=>
        {
            return name== marker.apps;
        });

        $scope.markers.map((marker)=>
        {
            marker.show=false;
            return marker;
        });

    };

    $scope.showCircle=function()
    {
        $scope.circleFilter.visible=!$scope.circleFilter.visible;
        $scope.circleFilter.center=angular.copy($scope.settings.map.center);

    }
    $scope.onClick=function(marker,event,model)
    {
        $scope.markerWindow.show=true;
        $scope.markerWindow.coords.latitude=model.latitude;
        $scope.markerWindow.coords.longitude=model.longitude;
        $scope.markerWindow.model=model;
        console.log($scope.markerWindow.model.apps)
    }

    $scope.onClose=function(marker,event,model)
    {
        $scope.markerWindow.show=false;
    }
}]);

