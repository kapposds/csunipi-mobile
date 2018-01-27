app.controller('DirectivesController', function($scope, $ionicScrollDelegate) {

    $scope.backToTop = function()
    {
    	$ionicScrollDelegate.scrollTop();
    }

	$scope.gotoExternalLink = function(url)
	{
	  window.open(url, '_system', 'location=yes');
	}      
    
});