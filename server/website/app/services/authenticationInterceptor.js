angular.module('myApp.services')
.factory('AuthenticationInterceptor',['$window',function($window)
	{	
		/**
	     * AuthenticationInterceptor Object
	     * Intercepts out going http requests and adds user auth header if it is
	     * in the localStorage of the window
	     */
		return {
			request:function(config)
			{
				var token = $window.localStorage.token;
				if($window.localStorage.token)
				{
					config.headers['Authorization']='Bearer '+token;
				}
				return config
			}
		};
	}]);
