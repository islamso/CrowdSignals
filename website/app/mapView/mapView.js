'use strict';

angular.module('myApp.mapView', ['ngRoute','uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/map', {
		templateUrl: 'mapView/mapView.html',
		controller: 'MapViewController'
	});
}])
.controller('MapViewController', ['$scope','ApiService','LocationService',function($scope,ApiService,LocationService) {
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

    $scope.circleFilter=
        {
            id: 1234,
            center:{ latitude: 47.609722, longitude: -122.333056},
            radius: 5000,
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
            visible: false, // optional: defaults to true
            control: {}
        };

    $scope.markers=[];
    $scope.selectApps=[];
    $scope.createMarkers=function()
    {
        $scope.prototypeMarkers=[];
        var tempApps = ['Reddit', 'Snapchat', 'Chrome', 'Facebook', 'Flickr'];

        console.log()
        var counter=0;
        for (var i = $scope.data.length - 1; i >= 0; i--) {
        	var data=$scope.data[i];
        	for (var j = data.longitude.length - 1; j >= 0; j--) {
	        	var marker={};
	            marker.id=counter++;
                marker.apps= tempApps[parseInt(Math.random() * (tempApps.length))];
	            marker.latitude=  data.latitude[j];
	            marker.longitude= data.longitude[j];
                marker.provider=data.provider[j];
                marker.time=new Date(data.timestamps[j]/1000000);
                marker.speed=data.speed.slice();
                marker.options={};
                marker.options.label={labelContent:'data',labelVisible: true}
                if($scope.selectApps.indexOf(marker.apps) == -1)
                    {
                        $scope.selectApps.push(marker.apps);
                    }
	            $scope.prototypeMarkers.push(marker);            
        	}
        }
        $scope.refresh();
    }

    function* idMaker(){
      var index = 0;
      while(true)
        yield index++;
    }


    $scope.showCircle=function()
    {
        $scope.circleFilter.visible=!$scope.circleFilter.visible;
        $scope.circleFilter.center=angular.copy($scope.settings.map.center);
    }
    $scope.refresh=function()
    {
        var speedCount=0;
        $scope.averageSpeed=0;
        $scope.markers=$scope.prototypeMarkers.filter((marker)=> 
            {
                return !$scope.circleFilter.visible || (LocationService.distance(marker, $scope.circleFilter.center)*100000 <  $scope.circleFilter.radius)
            });
        $scope.markers.map((marker)=>
        {
            marker.speed.map((speed)=>
            {
                $scope.averageSpeed+=speed;
                speedCount++;
            });
            marker.show=false;
            return marker;
        });
        $scope.averageSpeed/=speedCount;
    }

    $scope.userFilter=function(filterID)
    {
        $scope.markers=$scope.prototypeMarkers.filter((marker)=>
        {
            return marker.id == filterID;
        });

        $scope.markers.map((marker)=>
        {
            marker.show=false;
            return marker;
        });
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
    }
}]);

