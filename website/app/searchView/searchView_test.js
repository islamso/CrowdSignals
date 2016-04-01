'use strict';

describe('myApp.searchView module', function() {

  beforeEach(module('myApp.searchView'));

  describe('SearchViewController', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var searchViewCtrl = $controller('SearchViewController',{'$scope':$rootScope.new()});
      expect(searchViewCtrl).toBeDefined();
    }));

  });
});