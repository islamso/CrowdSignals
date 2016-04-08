'use strict';

angular.module('myApp.registerView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/registerView.html',
    controller: 'RegisterViewController'
  });
}])
.controller('RegisterViewController', ['$scope','AuthenticationService','$location','$timeout',function($scope,AuthenticationService,$location,$timeout) {
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