'use strict';

angular.module('myApp.loginView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'loginView/loginView.html',
    controller: 'LoginViewController'
  });
}])
.controller('LoginViewController', ['$scope','AuthenticationService','$location','$timeout',function($scope,AuthenticationService,$location,$timeout) {
	
	//Login Method	
	$scope.login=function()
	{
		function success(data){
			console.log('firing')
			$location.path('/search')
		}
		function error(error){
			$scope.addError({type:'danger',heading:'Error Occurred!',message:error})
		}
		AuthenticationService.login({username: $scope.username,password:$scope.password}).then(success,error);
	}

	//Error Handling
	$scope.errors;
	$scope.addError=function(error)
	{
		$scope.error=error;
	};
	$scope.removeError=function(error)
	{
		delete $scope.error;
	};
}]);