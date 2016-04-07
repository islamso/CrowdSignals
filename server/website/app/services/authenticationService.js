angular.module('myApp.services')
.service('AuthenticationService',['$http','$q','$window','jwtHelper','ApiUrl',function($http,$q,$window,jwtHelper,ApiUrl)
{

    /**
     * AuthenticationService.login
     * @return
     *  Promise, 
     *  resolves when server returns token and 200 status
     *  rejects when bad status code returns i.e login fails
     * @params
     *  data:Object
     *  {
     *      username: String,
     *      password: String
     *  }
     */
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

    /**
     * AuthenticationService.logout
     * @return
     *  nothing, logs user out
     */
    this.logout=function()
    {
		if($window.localStorage.token)
		{
			$window.localStorage.removeItem('token');
		}
    };

    /**
     * AuthenticationService.isLoggedIn
     * @return
     *  returns whether user is logged in
     */
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


