angular.module('myApp.services')
.factory('AuthenticationInterceptor',['$window',function($window)
	{
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
