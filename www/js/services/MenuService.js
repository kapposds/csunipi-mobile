// app.service('MenuService', function($http, $interval, CardsResource,HelperService) {
// 	this.menuitems = []

// 	this.getMenuItems = function () {
// 		// $http.get("$rootScope.backend_api_address+"/menuitems")
// 	 //    .success(function (response) {
// 	 //      	var menuitems = response;
// 	 //      	menuitems = HelperService.normalizeAccent(menuitems);//remove accents (function is in service)
// 	 //      	this.menuitems = menuitems
// 	 //     });
// 	 	var that =
// 	 	$interval(function() {
// 	 		this.menuitems.push({
// 	 			title: Math.random()
// 	 		})
// 	 	}, 2000)
// 	    return this.menuitems
// 	}
// });