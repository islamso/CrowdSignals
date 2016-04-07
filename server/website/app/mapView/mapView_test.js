'use strict';

describe('myApp.mapView module', function() {

  beforeEach(module('myApp.mapView'));

  describe('MapView controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var $scope={};
      var mapViewCtrl = $controller('MapViewController',{'$scope':$scope});
      expect(mapViewCtrl).toBeDefined();
      expect([
      		$scope.settings,
      		$scope.settings.map,
      		$scope.settings.bounds
      	]).toBeDefined();

    }));

  });
});
