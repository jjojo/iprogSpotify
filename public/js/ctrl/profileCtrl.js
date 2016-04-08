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
		console.log(Model.settings.access_token)
	}

	$scope.signed = function (argument) {
		// body...
		console.log(Model.signedIn())
	}

	$scope.getUser = function () {
		// body...
		Model.getUser().then(function (argument) {
			// body...
			$scope.userdata = argument.data
		})
	}


	window.onload = Model.setToken($routeParams.access_token.substring(13));
});