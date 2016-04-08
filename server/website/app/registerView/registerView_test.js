'use strict';

describe('myApp.registerView module', function() {

  beforeEach(module('myApp.registerView'));

  describe('RegisterView controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var $scope={};
      var registerViewCtrl = $controller('RegisterViewController',{'$scope':$scope});
      expect(registerViewCtrl).toBeDefined();
    }));

  });
});
