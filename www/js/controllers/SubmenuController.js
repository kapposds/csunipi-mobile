app.controller('SubmenuController', function($scope, $http, $state, $stateParams, $ionicLoading, SubmenuResource, HelperService) {
  
  $ionicLoading.show();
  // var url = window.location.href;
  // $last_url_segment = url.split('/').pop();
 // var card_resource = CardsResource.get({card:8}); //for a single card resource

  SubmenuResource.get({submenuitem:$stateParams.submenuitem}).$promise.then(function(data){
      var submenuitems=data;

      //the view title depends on the cards displayed
      $scope.viewtitle = submenuitems[0].menuitem.title;
 
      $scope.submenuitems = submenuitems;
      $ionicLoading.hide();

  });
  
  $scope.isNotDivider = function(submenuitem_alias)
  {
      if (submenuitem_alias!='undergraduate' && submenuitem_alias!='postgraduate' && submenuitem_alias!='doctoral' && submenuitem_alias!='studies-other')
      {
         return true;
      }
      else
      {
        return false;
      }
  }

  $scope.isGoogleMap = function()
  {                                              //in order to display it after first submenuitem is displayed
    if ($stateParams.submenuitem == 'contact' && $scope.submenuitems)
      return true;
  }

});