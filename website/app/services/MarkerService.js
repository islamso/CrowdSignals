angular.module('myApp.services',[])
.service('MarkerService',[function()
{
	this.returnMarker = function(id, lat, lng, app[])
	{
		return {
			id: id,
			lat: lat,
			lng: lng,
			app: app
		};
	}
}]);