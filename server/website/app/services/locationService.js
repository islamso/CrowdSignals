angular.module('myApp.services')
.service('LocationService',['uiGmapGoogleMapApi',function()
{
	this.distance=distance;
	this.withinRadius=withinRadius;

    function distance(x, y)
    {
        return Math.sqrt(Math.pow(((y.latitude)-(x.latitude)),2)+Math.pow(((y.longitude)-(x.longitude)),2));
    }
    function withinRadius(x, y, threshold)
    {
    	threshold= threshold || 0;
    	console.log(threshold)
    	return (distance(x, y)*90000 <  threshold)
    }

}]);


