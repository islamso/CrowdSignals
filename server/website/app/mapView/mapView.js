'use strict';

//Angular module for the map view
angular.module('myApp.mapView', ['ngRoute','uiGmapgoogle-maps'])

//Config for the route providers when navigating the website
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

//Main controller for the map view
.controller('MapViewController', ['$scope','ApiService','LocationService','MarkerService','$routeParams',function($scope,ApiService,LocationService,MarkerService,$routeParams) {
    $scope.markers=[];
    $scope.prototypeMarkers=[];
    $scope.selectApps=[];


    console.log($routeParams);

    //Creates a markerWindow
    $scope.markerWindow={
        show:false,
        coords:{latitude:0, longitude:0}
    };

    //Pulls the locations from the server and binds them to the scope
	ApiService.getLocations().success(function(data)
		{
				$scope.data=data;
				$scope.createMarkers();
		});

    //Status of the accordion panel tabs
    $scope.status={
        users:false,
        date:false,
        custom:false
    }

    $scope.bounds={};       //Used for imposing limits on the map (if needed)

    //Map settings such as the loaded centre point and giving a value to bounds
	$scope.settings = {

		map: { center: { latitude: 47.609722, longitude: -122.333056}, zoom: 10 },
        bounds:{
            northeast:{ latitude: 42.140015, longitude: -66.551881},
            southwest:{ latitude: 22.690595, longitude: -133.691100}
        }
	};

    //General attributes for the circle filter such as centre, colour, and radius
    $scope.circleFilter= {id: 1234, center:{ latitude: 47.609722, longitude: -122.333056}, radius: 5000, stroke: {color: '#08B21F', weight: 2, opacity: 1 }, fill: {color: '#08B21F', opacity: 0.5 }, geodesic: true, draggable: true,clickable: true,editable: true,visible: false, control: {} }; $scope.markers=[];
    
    //Array of apps to throw into application filter select tag
    $scope.selectApps=[];

    //Creates the markers from the location data using the services
    $scope.createMarkers=function()
    {
        $scope.prototypeMarkers=MarkerService.parse($scope.data);
        $scope.refresh();
    }


    //Refreshes the markers on the view with respect to the circle filter
    $scope.refresh=function()
    {
        $scope.markers=$scope.prototypeMarkers;
        if($scope.circleFilter.visible)
        {
            $scope.markers=MarkerService.filter.location($scope.prototypeMarkers,$scope.circleFilter.center, $scope.circleFilter.center);
        }   
        $scope.averageSpeed=MarkerService.stat.speed($scope.markers);
    }


    //Filters the markers on the screen depending on their ID
    $scope.userFilter=function(userId)
    {
        $scope.markers=MarkerService.filter.user($scope.markers, userId)
    }

    //Filters the markers on the screen depending on which app they're using
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

    //toggles the visibility of the circle filter
    $scope.showCircle=function()
    {
        $scope.circleFilter.visible=!$scope.circleFilter.visible;
        $scope.circleFilter.center=angular.copy($scope.settings.map.center);

    }

    //Toggles the visibility of the marker infoWindow
    $scope.onClick=function(marker,event,model)
    {
        $scope.markerWindow.show=true;
        $scope.markerWindow.coords.latitude=model.latitude;
        $scope.markerWindow.coords.longitude=model.longitude;
        $scope.markerWindow.model=model;
        console.log($scope.markerWindow.model.apps)
    }

    //What happens when the window is closed
    $scope.onClose=function(marker,event,model)
    {
        $scope.markerWindow.show=false;
    }
}]);

