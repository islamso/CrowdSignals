angular.module('myApp.services',[])
.service('ApiService',['ApiUrl','$http',function(ApiUrl,$http)
{
	this.getLocations=function(){return $http.get(ApiUrl+'/location'); }
	this.getLocationsByUserId=function(userId) {return $http.get(ApiUrl+'/location/'+userId); } 

}]);


