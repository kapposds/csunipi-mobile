app.directive('customFooter', function() {
	// function linkFunction($scope, element, attributes)
	// {
	// }
	return {
		templateUrl:'templates/footer.html',
		restrict:'EA',
		controller: 'DirectivesController',/*,
		link: linkFunction,
		scope:
		{
			json_breadcrumbs:'@'
		}*/
	};
});
