spotifyApp.controller('ProfileCtrl', function ($scope, Model, $location, $route, $routeParams) {
	console.log("profile controller loaded")

	$scope.items = [
	{'img': "http://placehold.it/184x184",
	'name': "item name"},

	{'img': "http://placehold.it/184x184",
	'name': "item name"},

	{'img': "http://placehold.it/184x184",
	'name': "item name"},

	{'img': "http://placehold.it/184x184",
	'name': "item name"},

	{'img': "http://placehold.it/184x184",
	'name': "item name"}
	]

	$scope.getToken = function (argument) {
		// body...
			$scope.token = $routeParams.access_token.substring(13)

	}

	
});