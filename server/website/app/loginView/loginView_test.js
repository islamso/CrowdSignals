'use strict';

describe('myApp.loginView module', function() {

  beforeEach(module('myApp.loginView'));

  describe('LoginView controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var $scope={};
      var loginViewCtrl = $controller('LoginViewController',{'$scope':$scope});
      expect(loginViewCtrl).toBeDefined();
    }));

  });
});
