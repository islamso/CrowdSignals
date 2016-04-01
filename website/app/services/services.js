angular.module('myApp.services',[])
.service('DataService',['$http',function($http)
{
	this.getLocationData=function()
	{
		return {"sensor_type": "location", "device_type": "smartphone", "timestamps": [{"timestamps": "1454961603954", "latitude": "47.544", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961589697000000", "latitude": "47.544", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961609225000000", "latitude": "47.544", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961629084", "latitude": "47.545", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961643978", "latitude": "47.545", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961665716", "latitude": "47.545", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961649254000000", "latitude": "47.545", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961669317000000", "latitude": "47.545", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961684185", "latitude": "47.545", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961705698", "latitude": "47.545", "longitude": "-122.019", "speed": "0.000"}, {"timestamps": "1454961714000", "latitude": "47.545", "longitude": "-122.019", "speed": "0.825"} ] };
	}

	this.locationsFromServer=function()
	{
		return $http.get('/api/location');
	}
}]);


