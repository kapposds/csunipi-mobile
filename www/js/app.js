// CS Unipi Ionic app
//this file contains 1) Definition of the app module 2)run function 3)config function

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'csunipi' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('csunipi', ['ionic', 'ionic.cloud', 'csunipi.controllers','ngCordova','ngResource','ngSanitize'])
.constant('ApiEndpoint', {
  url: 'http://localhost:8000'  // api endpoint: address where csunipi-api laravel app is served
})

//run---------------------------------------------------------------------------------------------------------------------------
app.run(function($http, $ionicPlatform, $rootScope, $ionicLoading, $ionicPush , $ionicPopup, $timeout, HelperService, ApiEndpoint) {  //this is executed only once after the app runs

  //used in views to access static resources from api
  $rootScope.api_endpoint_url = ApiEndpoint.url;


  //Register device token in order to recieve the push notifications
  $ionicPush.register().then(function(t) {
    return $ionicPush.saveToken(t);
  }).then(function(t) {
    console.log('Token saved:', t.token);
  });

  //Popup for push notification if the app is open
  $rootScope.$on('cloud:push:notification', function(event, data) {
  var msg = data.message;
  HelperService.pushPopup(msg);
  // alert(msg.title + ': ' + msg.text);
});

  //Handle Connection Errors
  $rootScope.initialTime = true;

  function handleOffline()
  {
    HelperService.connectionErrorPopup(); //show error popup
    $timeout(function () {
      $ionicLoading.hide();    
    }, 1000);
  }

  function handleOnline()
  {
    HelperService.reconnectPopup();
    $timeout(function () {
      $ionicLoading.hide();    
    }, 1000);    
  }

  $ionicPlatform.ready(function() { //when device is ready, or if it is ready execute immedeately

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
        if(!$rootScope.initialTime)//not for the first time
          handleOnline();
        if ($rootScope.initialTime==true)//not first time anymore
          $rootScope.initialTime = false;
    });

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        if(!$rootScope.initialTime)//not for the first time      
          handleOffline();
        if ($rootScope.initialTime==true)//not first time anymore
          $rootScope.initialTime = false;
    });

    //Connection and Server Check on every state change
    $rootScope.$on('$stateChangeSuccess', function(e, current, pre) {
      if(navigator.onLine == false) //no connection on device
      {
        if(!$rootScope.initialTime)//not for the first time
          handleOffline();
      }
      else{ //check server only if connection is ok
        $http.get(ApiEndpoint.url+'/api')//check if server is responding
        .success(function (response) {
          //server responded
          // console.log(response);
        })
        .error(function(data) {
          $ionicLoading.hide();
          // console.log(data);
            HelperService.serverErrorPopup();      
        });    
     }

        if ($rootScope.initialTime==true)//not first time anymore
          $rootScope.initialTime = false;  
    });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    } 
  });

})

//config-------------------------------------------------------------------------------------------------------------------------
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider , $ionicCloudProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(false); //for a more native-feel scrolling (deprecated probably)

    //cloud configuration
    $ionicCloudProvider.init({
    "core": {
      "app_id": "1a97bf19"
    },
    "push": {
      "sender_id": "948940849774",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#154c7a"
        }
      }
    }
  });

  $stateProvider 
    //root state
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppController',
    ncyBreadcrumb: {
      label: 'CS Unipi'
    }
  })

    //home state
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeController',
        }
      }     
    })  

    //search state
    .state('app.search', {
      url: '/search/:searchInput',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'SearchController',
          params: {
              searchInput: null
          }          
        }
      }     
    })      

    .state('app.submenu', {
      //state parameters are given a value in view from ui-sref attribute
      url: '/:submenuitem',
      views: {
        'menuContent': {
          templateUrl: 'templates/submenu.html',
          controller:'SubmenuController'
        }
      }     
    })

    .state('app.page', { 
      url: '/:submenu/:page', 
      views: {
        'menuContent': {
          templateUrl: 'templates/page.html',
          controller: 'PageController'/*,
          params: { test: null}*/
        }
      }  
    })

    .state('app.article', {
      url: '/:submenu/:page/:article',
      views: {
        'menuContent': {
          templateUrl: 'templates/article.html',
          controller: 'ArticleController'
        }
      }
    })

    //google map state
    .state('app.map', {
      url: '/contact/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MapController'
        }
      }     
    })      

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
  // $urlRouterProvider.otherwise('/app/404');
});
