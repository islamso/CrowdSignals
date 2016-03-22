angular.module('myApp.services',[])
.service('ApiService',['$q',function($q)
{
	var user={
		"id":jk23j4k,
		"devices":[]
	};
	this.getData=function()
	{
		return $q(function(resolve, reject)
			{
				resolve(user);
			});
	};	
}]);


