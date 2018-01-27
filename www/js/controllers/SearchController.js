app.controller('SearchController', function($scope, $ionicLoading, $stateParams, $state, $http, HelperService, ApiEndpoint,
										    PeopleSearchResource, NewsSearchResource, StudiesSearchResource, OtherSearchResource) {
  
  $ionicLoading.show();

  $scope.viewtitle = 'Αναζήτηση';

  $scope.search_input = $stateParams.searchInput;
  
	//News------------------------------------------------------------------------------------------------------	  

   $http.get(ApiEndpoint.url + "/api/search/news/"+$scope.search_input+"/count")
      .success(function (response) {
        $scope.newsLeft = response;

        //Initial State
        $scope.getNewsFeed(); 
    });  

	$scope.getNewsFeed = function()
	{
	    NewsSearchResource.get({input:$scope.search_input, skip:$scope.newsFeedCounter}).$promise.then(function(data)
	    { 
	        var news = data;
            news = HelperService.changeDateFormat(news);	        

       		$scope.newsLeft = $scope.newsLeft - news.length; 	        

            if ($scope.news) //if news is defined, its not the initial getfeed
            {
              $scope.news = $scope.news.concat(news);
            }     
            else //else if it the initial time, define news
            {         	
             $scope.news = news;
            }   

	        $scope.newsFeedCounter =$scope.news.length;   	    
	    }); 
	}


	//People----------------------------------------------------------------------------------------------------

   //get peopole count
   $http.get(ApiEndpoint.url + "/api/search/people/"+$scope.search_input+"/count")
      .success(function (response) {
        $scope.peopleLeft = response;

        //Initial State
        $scope.getPeopleFeed();        
    });  

	$scope.getPeopleFeed = function()
	{
	    PeopleSearchResource.get({input:$scope.search_input, skip:$scope.peopleFeedCounter}).$promise.then(function(data)
	    { 
	        var people = data;

       		$scope.peopleLeft = $scope.peopleLeft - people.length; 	        

            if ($scope.people) //if people is defined, its not the initial getfeed
            {
              $scope.people = $scope.people.concat(people);
            }     
            else //else if it the initial time, define people
            {         	
             $scope.people = people;
            }   

	        $scope.peopleFeedCounter =$scope.people.length;       
	    }); 
	}

	//Studies----------------------------------------------------------------------------------------------------

   $http.get(ApiEndpoint.url + "/api/search/studies/"+$scope.search_input+"/count")
      .success(function (response) {
        $scope.studiesLeft = response;

        //Initial State
        $scope.getStudiesFeed();            
    });  

	$scope.getStudiesFeed = function()
	{
	    StudiesSearchResource.get({input:$scope.search_input, skip:$scope.studiesFeedCounter}).$promise.then(function(data)
	    { 
	        var studies = data;

       		$scope.studiesLeft = $scope.studiesLeft - studies.length; 	        

            if ($scope.studies) //if nes is defined, its not the initial getfeed
            {
              $scope.studies = $scope.studies.concat(studies);
            }     
            else //else if it the initial time, define studies
            {         	
             $scope.studies = studies;
            }   

	        $scope.studiesFeedCounter =$scope.studies.length;   	    
	    }); 
	}

	//Other------------------------------------------------------------------------------------------------------

   $http.get(ApiEndpoint.url + "/api/search/other/"+$scope.search_input+"/count")
      .success(function (response) {
        $scope.otherLeft = response;

        //Initial State
        $scope.getOtherFeed(); 
    });  

	$scope.getOtherFeed = function()
	{
	    OtherSearchResource.get({input:$scope.search_input, skip:$scope.otherFeedCounter}).$promise.then(function(data)
	    { 
	        var other = data;

       		$scope.otherLeft = $scope.otherLeft - other.length; 	        

            if ($scope.other) //if nes is defined, its not the initial getfeed
            {
              $scope.other = $scope.other.concat(other);
            }     
            else //else if it the initial time, define other
            {         	
             $scope.other = other;
            }   

	        $scope.otherFeedCounter =$scope.other.length;
	        $ionicLoading.hide();    	    
	    }); 
	}

   //Helper Functions--------------------------------------------------------------------------------------------
    $scope.whatClassIsIt_search= function(article_thumbnail)
    {
      if (article_thumbnail)
      {
          return 'item search-item item-thumbnail-left';
      }
      else
      {
          return 'item search-item';
      }
    };

	  //triggered by submit search input
	  $scope.doSearch = function(new_search_input)
	  {
	    $state.go('app.search', {searchInput:new_search_input});
	  };  	

	$scope.search_field = "off";
	$scope.toggle = function()
	{
		$scope.search_field = $scope.search_field == 'on' ? 'off' : 'on';
	};

	//triggered by click on item
	$scope.gotoState = function(category,subcategory,post)
	{
	  if(category)//then its an article (the page in which the article belongs, is returned WITH them)
	  {
	    $state.go('app.article', {submenu:category, page:subcategory, article:post});
	  }
	  else //then its a page (page that page belongs is null of course, there is no page function in server)
	  {
	    $state.go('app.page', {submenu:category, page:post});
	  }
	} 

    //triggered by clicking on Website URL of a person
  $scope.externalWebsite = function (person_website)
  {
    window.open(person_website, '_system', 'location=yes');
  };
  
});