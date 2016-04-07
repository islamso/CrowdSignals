angular.module('myApp.services')
.service('ApiService',['ApiUrl','$http',function(ApiUrl,$http)
{

	this.getLocations=function(params){
		params=params || "";
		return $http.get(ApiUrl+'/api/location'+params); 
	}
	this.getLocationsByUserId=function(userId) {return $http.get(ApiUrl+'/api/location/'+userId); } 

}]);


