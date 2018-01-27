app.controller('ArticleController', function($scope, $stateParams, $ionicLoading, ArticlesResource, HelperService) {
	
  $ionicLoading.show();

	ArticlesResource.get({article:$stateParams.article , category:$stateParams.page}).$promise.then(function(data){

	    var articles=data;

	    //Viewtitle: depends on the cards displayed  
	    $scope.viewtitle = articles[0].viewtitle;
	   
	    //Update Views
	    for (i=0;i<articles.length;i++)
	    {
	        articles[i].views++;
	        ArticlesResource.update({article:$stateParams.article, category:$stateParams.page}, {views: articles[i].views});
	    
	    }

		//Update Downloads (only for articles with attachement)
    	$scope.updateDownloads = function()
	    {
	    	if (articles[0].attachement == 1)
	    	{
				for (i=0;i<articles.length;i++)
	    		{
	        		articles[i].downloads++;
	        		ArticlesResource.update({article:$stateParams.article, category:$stateParams.page}, {downloads: articles[i].downloads});
	    	    }	    		

	    	}
	    }    

	    articles = HelperService.changeDateFormat(articles);

	    $scope.articles = articles;
    	$ionicLoading.hide();   	    
  });

});