angular.module('myApp.services')
.service('ApiService',['ApiUrl','$http',function(ApiUrl,$http)
{
    /**
     * ApiService.getLocations
     * @return
	 * $http Promise
	 *   resolves returns api data
	 *   rejects returns error
     * @params
	 * 	 params key/pair value style filtering i.e ?stuff=1&otherStuff=2
     */
	this.getLocations=function(params){
		params=params || "";
		return $http.get(ApiUrl+'/api/location'+params); 
	}

}]);


