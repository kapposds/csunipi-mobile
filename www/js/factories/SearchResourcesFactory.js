app.factory('NewsSearchResource', function($resource, ApiEndpoint){
	return $resource(ApiEndpoint.url+"/api/search/news/:input?limit=2&offset=:skip", null,
	  {
	      'get': { method:'GET' , isArray: true },
	  });
});

app.factory('PeopleSearchResource', function($resource, ApiEndpoint){
	return $resource(ApiEndpoint.url+"/api/search/people/:input?limit=2&offset=:skip", null,
	  {
	      'get': { method:'GET' , isArray: true },
	  });
});

app.factory('StudiesSearchResource', function($resource, ApiEndpoint){
	return $resource(ApiEndpoint.url+"/api/search/studies/:input?limit=2&offset=:skip", null,
	  {
	      'get': { method:'GET' , isArray: true },
	  });
});

app.factory('OtherSearchResource', function($resource, ApiEndpoint){
	return $resource(ApiEndpoint.url+"/api/search/other/:input?limit=2&offset=:skip", null,
	  {
	      'get': { method:'GET' , isArray: true },
	  });
});