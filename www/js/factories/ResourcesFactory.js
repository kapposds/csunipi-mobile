app.factory('SubmenuResource', function ($resource, ApiEndpoint) {
	return $resource(ApiEndpoint.url+"/api/submenuitems/:submenuitem", null,
	  {
	      'get': { method:'GET' , isArray: true },
	      'update': {method:'PUT'}
	  });
});

app.factory('PagesResource', function($resource, ApiEndpoint){
	return $resource(ApiEndpoint.url+"/api/pages/:page?", null,
	  {
	      'get': { method:'GET' , isArray: true },
	      'update': {method:'PATCH'}
	  });
});

app.factory('ArticleCategoryResource', function($resource, ApiEndpoint){
	return $resource(ApiEndpoint.url+"/api/articles/:category?limit=5&offset=:skip", null,
 	// return $resource(ApiEndpoint.url+"/articles/:category", null,	
	  {
	      'get': { method:'GET' , isArray: true },
	      'update': {method:'PATCH'}
	  });
});

app.factory('ArticlesResource', function($resource, ApiEndpoint){
	return $resource(ApiEndpoint.url+"/api/articles/:category/:article", null,
	  {
	      'get': { method:'GET' , isArray: true },
	      'update': {method:'PATCH'}
	  });
});

app.factory('PeopleCategoryResource', function($resource, ApiEndpoint){
	return $resource(ApiEndpoint.url+"/api/people/:category", null,
	  {
	      'get': { method:'GET' , isArray: true },
	      'update': {method:'PATCH'}
	  });
});