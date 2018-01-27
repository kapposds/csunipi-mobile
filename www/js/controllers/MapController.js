app.controller('MapController', function($scope, $ionicLoading, $stateParams) {
  
  $ionicLoading.show();

  $scope.viewtitle = 'Χάρτης';  

  //triggered when div #map is loaded
  $scope.googleMap = function()
  {

      var latlng = new google.maps.LatLng(37.9416261 , 23.6530238);
      var map;

      var mapOptions =
      {
          center: latlng,
          zoom:16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
          ,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
          },
          navigationControl: true          
      };

      
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
     $scope.map = map;
     google.maps.event.addDomListener(window, 'load', $scope.googleMap);    
     //Wait until the map is loaded
     loadMarker(latlng);
  
  };

  //load marker 
  function loadMarker(latlng){
      google.maps.event.addListenerOnce($scope.map, 'idle', function(){      
          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latlng
          });    
     });
  }  

  $ionicLoading.hide();

});