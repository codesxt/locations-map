var miApp = angular.module('miApp', ["leaflet-directive"]);
var tilesDict = {
  mapbox_outdoors: {
    name: 'Mapbox Outdoors',
    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    type: 'xyz',
    options: {
      apikey: 'pk.eyJ1IjoiY29kZXN4dCIsImEiOiJjaWc4ZW95Z2YwOTRndnhrdjBvZHBxbW95In0.thmYteAR25Fu-fJH2I3ZTA',
      mapid: 'codesxt.cig8eowrz09fwt6lyhcmpfzst'
    }
  }
};
miApp.controller("ctrl", function($scope, PlacesSvc) {
  angular.extend($scope, {
         center: {
            lat: -35.447001328290014,
            lng: -71.69618189334871,
            zoom: 16
         },
         tiles: tilesDict.mapbox_outdoors,
         markers: {},
         events: {}
  });
  $scope.cursor = {
    text: "",
    lat: $scope.center.lat,
    lng: $scope.center.lng
  }
  $scope.addPlace = function(){
    if (true) {
			PlacesSvc.create({
				name: $scope.cursor.text,
				loc: {
          type: "Point",
          coordinates: [$scope.cursor.lat, $scope.cursor.lng]
        }
			}).success(function (place) {
				$scope.loadPlaces();
			})
		}
  }
  $scope.loadPlaces = function(){
    PlacesSvc.fetch().success(function (places) {
      var newPlaces = places.map(function(place){
        var lat = place.loc.coordinates[0];
        var lng = place.loc.coordinates[1];
        var message = place.name
        return {
          lat: lat,
          lng: lng,
          message: message
        }
      });
      angular.extend($scope, {
        markers: newPlaces
      });
    });
  };
  $scope.addRandomPlace = function(){
    PlacesSvc.addRandom().success(function (){
      $scope.loadPlaces();
    });
  };
  $scope.$on("leafletDirectiveMap.mapid.click", function(event, args){
    var leafEvent = args.leafletEvent;

    $scope.cursor.lat = leafEvent.latlng.lat;
    $scope.cursor.lng = leafEvent.latlng.lng;
  });
});
miApp.service('PlacesSvc', function ($http) {
  this.fetch = function (){
    return $http.get('/api/places');
  };
  this.addRandom = function (){
    return $http.get('/api/places/addtest');
  };
  this.create = function(place){
    return $http.post('/api/places', place);
  }
});
