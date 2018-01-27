angular.module('csunipi.controllers', []);

app.controller('AppController', function($scope, $state, $ionicLoading, $ionicHistory, $http,
                                          HelperService, $ionicSideMenuDelegate, $ionicLoading){


  $scope.toggleMenu = function()
  {
    $ionicHistory.nextViewOptions({
        disableAnimate: true
    });
    $ionicSideMenuDelegate.toggleRight(); //close side menu
  }  

  //triggered by submit search input
  $scope.doSearch = function(search_input)
  {
    $state.go('app.search', {searchInput:search_input});
  };

  //triggered by clicking on menuitems with external_url
  $scope.gotoExternalLink = function(url) //onClcick doesnt work with ui-sref (ui router)
  {
    window.open(url, '_system', 'location=yes');
  }     

    // $http.get('http://192.168.1.2:81/menuitems')
$http.get('data/menuitems.json', {headers : {'Content-Type' : 'application/json; charset=UTF-8'} ,} )
  .success(function (response) {  
      // alert(" http requests : SUCCESS!");
      var menuitems = response;
      menuitems = HelperService.normalizeAccent(menuitems);//remove accents (function is in service)
      $scope.menuitem_home = HelperService.keepHome(menuitems);

      menuitems = HelperService.spliceHome(menuitems);

      //there is a bug if the 2 following lines of codes switch
      $scope.secondary_menuitems = HelperService.keepSecondaryMenuitems(menuitems);

      $scope.menuitems_without_home = HelperService.spliceSecondaryMenuitems(menuitems);   
    })
    .error(function(data) {
      alert("http request (in AppController) : ERROR");
      $ionicLoading.hide();
      //ERROR PAGE
    });


});

// -----------------------------------------------------------------------------

// app.controller('LoginCtrl', function($scope $ionicModal, $timeout) { 

//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   // Form data for the login modal
//   $scope.loginData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };

//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// });