app.controller('PageController', function($scope, $stateParams, $http, $ionicLoading,
                                          PagesResource, ArticleCategoryResource, PeopleCategoryResource, 
                                          HelperService, ApiEndpoint)
{
  $ionicLoading.show();

  //page  
  PagesResource.get({page:$stateParams.page}).$promise.then(function(data){
    // console.log($stateParams.page);

    var pages=data;

    //Viewtitle: depends on the cards displayed  
    $scope.viewtitle = pages[0].viewtitle;

    //for pages with Avatars
    if(HelperService.hasAvatars(pages[0].alias))
        {
            showAvatars();
        }    
   
    //Update Views
    for (i=0;i<pages.length;i++)
    {
        pages[i].views++;
        PagesResource.update({page:$stateParams.page}, {views: pages[i].views});
        // PagesResource.save({alias: 'saimon', category: 'president-message', 'title':'titlos', content: 'content', views:'5'});
    }

    pages = HelperService.changeDateFormat(pages);

    $scope.pages = pages;
  
  });


//articles-------------------------------------------------------------------------------------------------

    //get articles count
   $http.get(ApiEndpoint.url + "/api/articles/"+$stateParams.page+"/count")
      .success(function (response) {
        $scope.totalArticles = response; //used to display total articles number
        $scope.articlesLeft = response; //used for offset calculation
        // console.log('response: ' + response);
        
        //Initial State 
        $scope.getFeed();
    });  

    //triggred by loadmore button
    $scope.getFeed = function()
    {
        $ionicLoading.show();
        ArticleCategoryResource.get({category:$stateParams.page, skip:$scope.peopleFeedCounter}).$promise.then(function(data){    

        var articles=data;

        $scope.articlesLeft = $scope.articlesLeft - articles.length;     
        // console.log('articles left: ' + $scope.articlesLeft);  

        if (articles.length>0) //if the page doesn't have any article, avoid the following
        {
            articles = HelperService.changeDateFormat(articles);
            if ($scope.articles) //if articles is defined, its not the initial getfeed
            {
              $scope.articles = $scope.articles.concat(articles);
            }     
            else //else if it the initial time, define articles
            {
             $scope.articles = articles;
             $scope.latest_article_date=articles[0].created_at;                
            }    

            $scope.peopleFeedCounter =$scope.articles.length;
        }
        $ionicLoading.hide();
        });
    };



    //add thumbnail class if article has thumbnail, triggered by ng-class
    $scope.whatClassIsIt_articles= function(article_thumbnail,page_category)
    {
      if (article_thumbnail)
      {
          return 'item '+page_category+' item-thumbnail-left';
      }
      else
      {
          return 'item '+page_category; //in view it would be: item {{page.category}}
      }
    };      

//avatars--------------------------------------------------------------------------------------------------

  //triggered only when page has avatars
  function showAvatars()
  {
    $scope.showAvatars = true; //used to show avatars in dom
    PeopleCategoryResource.get({category:$stateParams.page}).$promise.then(function(data)
    { 
        var people = data;
        people =HelperService.sortPeople(people); //custom sort
        $scope.people = people;
    }); 

  };

  //triggered by ng-class
  $scope.whatClassIsIt_avatars= function(person_alias)
  {
    if (person_alias == 'president' || person_alias =='professors' || person_alias == 'associate-professors' || person_alias=='assistant-professors' || person_alias =='lecturers' || person_alias=='professors-emeriti')
    {
        return 'item item-divider';
    }
    else
    {
        return 'item item-avatar';
    }
  };

  //triggered by clicking on Website URL of a person
  $scope.externalWebsite = function (person_website)
  {
    window.open(person_website, '_system', 'location=yes');
  };

 });