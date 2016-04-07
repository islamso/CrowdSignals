angular.module('myApp.services')
.service('AuthenticationService',['$http','$q','$window','jwtHelper','ApiUrl',function($http,$q,$window,jwtHelper,ApiUrl)
{
    this.login=function(data)
    {
    	return $q(function(resolve,reject)
    		{
    			$http.post(ApiUrl + '/login',data)
			    	.success(function(data)
				    	{
				    		console.log(data);
				    		$window.localStorage.setItem('token',data.token);
				    		resolve();
				    	})
			    	.error(function(data)
			    		{
			    			reject(data);
			    		});
	    	});

    };

    this.logout=function()
    {
		if($window.localStorage.token)
		{
			$window.localStorage.removeItem('token');
		}
    };

    this.isLoggedIn=function()
    {
    	var token=$window.localStorage.getItem('token');
    	if(token)
    	{
    		if(jwtHelper.isTokenExpired(token))
    		{
    			console.log('Token Expired');
    			$window.localStorage.removeItem('token');
    			return false;
    		}
	    	return true;
    	}
    	console.log('Token Missing');
    	return false;
    };
}]);


