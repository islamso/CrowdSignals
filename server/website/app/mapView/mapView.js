'use strict';


//angular controller
angular.module('myApp.mapView', ['ngRoute','uiGmapgoogle-maps'])

//Config for the routes when navigating the website
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

// Main controller for the map view
.controller('MapViewController', ['$scope','ApiService','LocationService','MarkerService','$routeParams',function($scope,ApiService,LocationService,MarkerService,$routeParams) {
    $scope.markers=[];
    $scope.prototypeMarkers=[];
    $scope.selectApps=[];


    // instantiating the marker window
    $scope.markerWindow={
        show:false,
        coords:{latitude:0, longitude:0}
    };

    // uses the services to get the location data from the server
    ApiService.getLocations($routeParams.param).success(function(data)
        {
                $scope.data=data;
                $scope.createMarkers();
        });

    // statuses for the accordion bodies
    $scope.status={
        users:false,
        date:false,
        custom:false
    }

    //instantiating the bounds
    $scope.bounds={};

    //contains map settings for things such as centre and the bounds
    $scope.settings = {

        map: { center: { latitude: 47.609722, longitude: -122.333056}, zoom: 10 },
        bounds:{
            northeast:{ latitude: 42.140015, longitude: -66.551881},
            southwest:{ latitude: 22.690595, longitude: -133.691100}
        }
    };

    //settings for the circle filter
    $scope.circleFilter= {id: 1234, center:{ latitude: 47.609722, longitude: -122.333056}, radius: 5000, stroke: {color: '#08B21F', weight: 2, opacity: 1 }, fill: {color: '#08B21F', opacity: 0.5 }, geodesic: false, draggable: true,clickable: true,editable: true,visible: false, control: {} }; $scope.markers=[];
    
    //Controls the visibility of the circle filter
    $scope.showCircle=function()
    {
        $scope.circleFilter.visible=!$scope.circleFilter.visible;
        $scope.circleFilter.center=angular.copy($scope.settings.map.center);

    }

    //populates the markers array with markers
    $scope.createMarkers=function()
    {
        $scope.prototypeMarkers=MarkerService.parse($scope.data);
        $scope.refresh();
    }

    //refreshes the markers on the page based on the circle filter
    $scope.refresh=function()
    {
        $scope.markers=$scope.prototypeMarkers;
        if($scope.circleFilter.visible)
        {
            $scope.markers=MarkerService.filter.location($scope.prototypeMarkers, $scope.circleFilter.center, $scope.circleFilter.radius);
        }   

        $scope.averageSpeed=MarkerService.stat.speed($scope.markers);
    }


    //filters the visible markers based on their id
    $scope.userFilter=function(userId)
    {
        $scope.markers=MarkerService.filter.user($scope.markers, userId)
    }

    /*----------  Marker events  ----------*/
    
    //shows the infowindow on clicking a marker
    $scope.onClick=function(marker,event,model)
    {
        $scope.markerWindow.show=true;
        $scope.markerWindow.coords.latitude=model.latitude;
        $scope.markerWindow.coords.longitude=model.longitude;
        $scope.markerWindow.model=model;
        console.log($scope.markerWindow.model.apps)
    }

    //hides the info window on closing the info window
    $scope.onClose=function(marker,event,model)
    {
        $scope.markerWindow.show=false;
    }
}]);

