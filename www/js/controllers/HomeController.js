app.controller('HomeController', function($scope, $state, $http, HelperService, $ionicLoading) {

  $scope.viewtitle = "CS Unipi";

	//triggered by clicking on menuitems with external_url
	$scope.gotoExternalLink = function(url) //onClcick doesnt work with ui-sref
	{
	  window.open(url, '_system', 'location=yes');
	}    

  //triggered by submit search input
  $scope.doSearch = function(search_input)
  {
    $state.go('app.search', {searchInput:search_input});
  };

  // $http.get(ApiEndpoint.url + "/api/menuitems")
$http.get('data/menuitems.json', {headers : {'Content-Type' : 'application/json; charset=UTF-8'} } )
  .success(function(response) {
    var navicons = response;
    navicons = HelperService.spliceHome(navicons);

    $scope.secondary_navicons = HelperService.keepSecondaryMenuitems(navicons);

    $scope.primary_navicons = HelperService.spliceSecondaryMenuitems(navicons);

    $ionicLoading.hide();
});

});