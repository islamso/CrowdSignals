angular.module('myApp.services')
.service('LocationService',['uiGmapGoogleMapApi',function()
{
	this.distance=distance;
	this.withinRadius=withinRadius;

    /**
     * LocationService.distance
     * @return
     *  distance between two passed coordinate objects
     * @params
     *  x coordinate object containing both latitude and longitude attributes
     *  y coordinate object containing both latitude and longitude attributes
     */
    function distance(x, y)
    {
        return Math.sqrt(Math.pow(((y.latitude)-(x.latitude)),2)+Math.pow(((y.longitude)-(x.longitude)),2));
    }

    /**
     * LocationService.withinRadius
     * @return
     *  boolean - whether the passed coordinate objects
     * are within specified distance of each other
     * @params
     *  x coordinate object containing both latitude and longitude attributes
     *  y coordinate object containing both latitude and longitude attributes
     *  threshold - max distance between both x and y
     */
    function withinRadius(x, y, threshold)
    {
    	threshold= threshold || 0;
    	console.log(threshold)
    	return (distance(x, y)*90000 <  threshold)
    }

}]);


