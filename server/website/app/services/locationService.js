angular.module('myApp.services')
.service('LocationService',[function()
{
    this.distance=function(x, y)
    {
        return Math.sqrt(Math.pow(((y.latitude)-(x.latitude)),2)+Math.pow(((y.longitude)-(x.longitude)),2));
    }
}]);


